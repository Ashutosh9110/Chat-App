import LogoutButton from "../components/LogoutButton"
import ChannelList from "../components/ChannelList"
import ChatBox from "../components/ChatBox"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  const [activeChannel, setActiveChannel] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const setup = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) await supabase.realtime.setAuth(session.access_token)
    }
    setup()
  }, [])
  
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setCurrentUser(user)
      const presenceChannel = supabase.channel("online-users", {
        config: { presence: { key: user.id } }
      })
      presenceChannel.on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState()
        const users = Object.entries(state).map(([userId, instances]) => ({
          id: userId,
          name: instances[0].name,
        }))
        setOnlineUsers(users)
      })
      presenceChannel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await presenceChannel.track({
            name: user.user_metadata?.name ?? "Unknown"
          })          
        }
      })
    }
    init()
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <aside className="w-72 bg-white border-r shadow-md flex flex-col">

        <div className="p-4 border-b bg-gray-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
            {currentUser?.user_metadata?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              {currentUser?.user_metadata?.name}
            </p>
            <p className="text-sm text-green-700">
              🟢 Online
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <ChannelList onSelect={(ch) => setActiveChannel(ch)} />
        </div>
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-bold">
            {activeChannel ? `#${activeChannel.name}` : "📭 Select a Channel"}
          </h1>
          <div className="text-sm font-medium text-green-700">
            🟢 {onlineUsers.length} online
          </div>
        </div>
        <div className="flex-1 bg-gray-100">
          {activeChannel ? (
            <ChatBox channel={activeChannel} />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              Select a channel to start chatting.
            </div>
          )}
        </div>
      </main>

      <aside className="w-64 bg-white border-l shadow-inner p-4 overflow-y-auto hidden lg:block">
        <h2 className="text-lg font-semibold mb-3">Online Users</h2>
        <ul className="space-y-2">
          {onlineUsers.map((u) => (
            <li
              key={u.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                {u.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>

            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
