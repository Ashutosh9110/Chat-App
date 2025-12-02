import { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import ChannelList from "../components/ChannelList";

export default function Dashboard() {
  const [activeChannel, setActiveChannel] = useState(null);

  return (
    <div className="flex h-screen">

      {/* LEFT SIDEBAR */}
      <ChannelList onSelect={(ch) => setActiveChannel(ch)} />

      {/* MAIN CHAT AREA */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            {activeChannel ? `#${activeChannel.name}` : "Select a channel"}
          </h1>

          <LogoutButton />
        </div>

        {!activeChannel && (
          <p className="text-gray-500">Choose a channel from the left to start chatting.</p>
        )}

        {activeChannel && (
          <div className="p-4 bg-white rounded shadow">
            <p>Chat messages will come here...</p>
          </div>
        )}
      </div>
    </div>
  );
}
