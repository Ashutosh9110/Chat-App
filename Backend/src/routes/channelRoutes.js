const express = require("express")
const { supabase } = require("../../supabaseClient");

const router = express.Router();


router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("channels").select("*");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});


router.post("/", async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase
    .from("channels")
    .insert({ name })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});


router.post("/:id/join", async (req, res) => {
  const user_id = req.user.id;
  const channel_id = req.params.id;

  const { data, error } = await supabase
    .from("channel_members")
    .insert({ user_id, channel_id })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});


router.post("/:id/leave", async (req, res) => {
  const user_id = req.user.id;
  const channel_id = req.params.id;

  const { error } = await supabase
    .from("channel_members")
    .delete()
    .eq("user_id", user_id)
    .eq("channel_id", channel_id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Left channel" });
});


router.get("/:id/members", async (req, res) => {
  const { data, error } = await supabase
    .from("channel_members")
    .select("user_id")
    .eq("channel_id", req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});


module.exports = router;
