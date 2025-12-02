import React, { useState } from "react";
import axios from "axios";

export default function CreateChannelModal({ onCreate }) {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    const res = await axios.post("http://localhost:5000/channels", { name });
    onCreate(res.data);
    setName("");
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="New channel name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
        onClick={handleCreate}
      >
        Create Channel
      </button>
    </div>
  );
}
