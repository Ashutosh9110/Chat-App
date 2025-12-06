import { createUserClient } from "../lib/supabaseUserClient.js";


export const getChannels = async (req, res) => {
  try {
    const user_id = req.user.id;
    const supa = createUserClient(req.supabaseToken);
    const { data, error } = await supa
      .from("channels")
      .select(`
        id,
        name,
        is_public,
        created_by,
        channel_members(count),
        user_member:channel_members!left(user_id)
      `)
      .order("is_public", { ascending: false })
      .order("name", { ascending: true });

    if (error) {
      console.error("GET CHANNELS ERROR:", error);
      return res.status(500).json([]);
    }
    const channels = Array.isArray(data) ? data : [];
    const result = channels.map((c) => ({
      ...c,
      memberCount: c.channel_members?.[0]?.count || 0,
      isMember: c.is_public
        ? true
        : c.user_member?.some((m) => m.user_id === user_id)
    }));
    res.json(result || []);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.json([]);
  }
};


export const createChannel = async (req, res) => {
  try {
    const { name, is_public } = req.body;
    const user_id = req.user.id;
    const supa = createUserClient(req.supabaseToken);
    const { data, error } = await supa
      .from("channels")
      .insert({
        name,
        is_public,
        created_by: user_id,
      })
      .select()
      .single();
    if (error) {
      console.error("Create Channel Error:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const joinChannel = async (req, res) => {
  try {
    const channel_id = req.params.id;
    const user_id = req.user.id;
    const supa = createUserClient(req.supabaseToken);
    const { data: channel, error: chErr } = await supa
      .from("channels")
      .select("is_public")
      .eq("id", channel_id)
      .single();
    if (chErr || !channel)
      return res.status(404).json({ error: "Channel not found" });
    if (channel.is_public)
      return res.json({ message: "Public channel — no join needed" });
    const { data: exists } = await supa
      .from("channel_members")
      .select("id")
      .eq("channel_id", channel_id)
      .eq("user_id", user_id);

    if (exists?.length > 0)
      return res.json({ message: "Already a member" });
    await supa
      .from("channel_members")
      .insert({ channel_id, user_id });

    res.json({ success: true });
  } catch (err) {
    console.error("JOIN ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const leaveChannel = async (req, res) => {
  try {
    const channel_id = req.params.id;
    const user_id = req.user.id;
    const supa = createUserClient(req.supabaseToken);
    const { error } = await supa
      .from("channel_members")
      .delete()
      .eq("channel_id", channel_id)
      .eq("user_id", user_id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  } catch (err) {
    console.error("LEAVE ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const listMembers = async (req, res) => {
  try {
    const channel_id = req.params.id;
    const supa = createUserClient(req.supabaseToken);
    const { data, error } = await supa
      .from("channel_members")
      .select("user_id")
      .eq("channel_id", channel_id);
    if (error) return res.status(500).json(error);
    res.json(data);
  } catch (err) {
    console.error("MEMBERS ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


