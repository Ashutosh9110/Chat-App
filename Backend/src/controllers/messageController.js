import { supabase } from "../server/supabase.js";
import { createUserClient } from "../lib/supabaseUserClient.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, channel_id } = req.body;
    const user_id = req.user.id;
    if (!content || !channel_id) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const supa = createUserClient(req.supabaseToken);
    const { data, error } = await supa
      .from("messages")
      .insert({ user_id, channel_id, content })
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles!messages_user_id_fkey(name, email)
      `)
      .single();
    if (error) {
      console.error("MESSAGE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};





export const getMessages = async (req, res) => {
  try {
    const channel_id = req.params.id;
    const supa = createUserClient(req.supabaseToken);
    const { data, error } = await supa
      .from("messages")
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles!messages_user_id_fkey(name,email)
      `)
      .eq("channel_id", channel_id)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("GET MESSAGES ERROR:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};


