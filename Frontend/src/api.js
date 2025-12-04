import axios from "axios";
import { supabase } from "./lib/supabase";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

export default API;
