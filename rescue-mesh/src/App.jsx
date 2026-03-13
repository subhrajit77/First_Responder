import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db/db";

function App() {
    const [msg, setMsg] = useState("");

    // This automatically updates the UI when the database changes
    const allMessages = useLiveQuery(() => db.messages.toArray());

    const handleSendMessage = async () => {
        if (!msg) return;
        await db.messages.add({
            text: msg,
            priority: "Pending AI...", // Phase 2 will fill this
            timestamp: Date.now(),
            status: "Local",
        });
        setMsg("");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>RescueMesh Offline</h1>

            <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your emergency message..."
                rows="4"
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
                onClick={handleSendMessage}
                style={{ padding: "10px 20px" }}
            >
                Save Message Offline
            </button>

            <h2>Logged Messages (Stored Locally)</h2>
            <ul>
                {allMessages?.map((m) => (
                    <li key={m.id}>
                        <strong>[{m.priority}]</strong>: {m.text}
                        <br />
                        <small>{new Date(m.timestamp).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
