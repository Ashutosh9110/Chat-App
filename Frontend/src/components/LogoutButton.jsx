import { supabase } from "../lib/supabase";

export default function Logout() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return <button onClick={logout}>Logout</button>;
}
