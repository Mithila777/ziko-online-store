"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../Layout";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [replyMap, setReplyMap] = useState<{ [key: string]: string }>({});

  // Fetch messages
  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle reply input change
  const handleChange = (messageId: string, value: string) => {
    setReplyMap({ ...replyMap, [messageId]: value });
  };

  // Send reply
  const handleReply = async (messageId: string) => {
    const reply = replyMap[messageId];
    if (!reply) return;

    const res = await fetch(`/api/contact/${messageId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });

    if (res.ok) {
      alert("Reply sent!");
      setReplyMap({ ...replyMap, [messageId]: "" });
      fetchMessages();
    } else {
      alert("Failed to send reply.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          User Messages
        </h2>

        <div className="space-y-6">
          {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-200"
            >
              {/* User Info */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <p className="font-semibold text-gray-800">{msg.user.name || "Anonymous"}</p>
                <p className="text-gray-500 text-sm">{msg.user.email}</p>
              </div>

              {/* Message */}
              <p className="text-gray-700 mb-3">{msg.message}</p>

              {/* Replies */}
              <div className="ml-4 mb-3">
                <h4 className="font-semibold text-gray-800 mb-1">Replies:</h4>
                {msg.replies.length > 0 ? (
                  msg.replies.map((r: any) => (
                    <p
                      key={r.id}
                      className="text-sm text-gray-600 border-l-2 border-green-400 pl-2 mb-1"
                    >
                      ↳ {r.content}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No replies yet.</p>
                )}
              </div>

              {/* Reply Input */}
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Type reply..."
                  value={replyMap[msg.id] || ""}
                  onChange={(e) => handleChange(msg.id, e.target.value)}
                  className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={() => handleReply(msg.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
