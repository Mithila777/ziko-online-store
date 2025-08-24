"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserLayout from "../Layout";

type Reply = { id: string; content: string; adminId: string; createdAt: string };
type Message = { id: string; message: string; createdAt: string; replies: Reply[] };

export default function MyMessages() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const [newMessage, setNewMessage] = useState({ message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  // Fetch user messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact/myMessage");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage({ message: e.target.value });
  };

  // Submit new message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      setStatus("❌ You must be logged in to send a message.");
      return;
    }

    setSending(true);
    setStatus("");

    try {
      const payload = {
        ...newMessage,
        userId: session.user.id,
        email: session.user.email,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("✅ Message sent!");
      setNewMessage({ message: "" });
      fetchMessages(); // refresh the list
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <UserLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
       
        {/* Messages and Replies */}
        <div className="space-y-6">
          {messages.length === 0 && <p>No messages yet.</p>}
          {messages.map((msg) => (
            <div key={msg.id} className="p-4 shadow rounded-md bg-gray-50">
              {/* User message */}
              <div className="bg-blue-50 p-3 rounded mb-2">
                <p>{msg.message}</p>
                <small>Sent at: {new Date(msg.createdAt).toLocaleString()}</small>
              </div>

              {/* Admin replies */}
              {msg.replies.length > 0 ? (
                <div className="ml-6 space-y-2">
                  {msg.replies.map((reply) => (
                    <div key={reply.id} className="bg-green-100 p-2 rounded">
                      <p>{reply.content}</p>
                      <small>Admin replied at: {new Date(reply.createdAt).toLocaleString()}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="ml-6 text-gray-400">No replies yet.</p>
              )}
            </div>
          ))}
        </div>
         {/* New Message Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <textarea
            name="message"
            placeholder="Type your message..."
            value={newMessage.message}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {sending ? "Sending..." : "Send"}
          </button>
          {status && (
            <p className={`mt-2 ${status.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
              {status}
            </p>
          )}
        </form>

      </div>
    </UserLayout>
  );
}
