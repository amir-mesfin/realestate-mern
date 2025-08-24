import React, { useState, useEffect } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/contact/getMessage");
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();
        setMessages(data); // save messages to state
      } catch (err) {
        setError(err.message);
      }
    };

    getMessages();
  }, []);

  const DeleteMessage = async(messageId) =>{
    try{
          const res = await fetch(`/api/contact/deleteMassage/${messageId}`,{
            method:"DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            SetError(data.massage);
            return;
          }
          setMessages(prev => prev.filter(u => u._id !== messageId));
    }catch(err){
      setError(err);
    }
  }
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-blue-900 mb-11 text-center">
        Contact Messages
      </h2>
    
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {messages.length === 0 ? (
        <p className="text-gray-600 text-center m">No messages found.</p>
      ) : (
        <div className="space-y-4  flex flex-col gap-5">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="border-4 p-4 rounded-lg  bg-white shadow-sm hover:shadow-md transition border-blue-700"
            >
              <p>
                <span className="font-semibold">Name:</span> {msg.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> <span className="text-blue-600"> {msg.email}</span>
              </p>
              <p>
                <span className="font-semibold">Message:</span>  <span className="text-green-600 font-semibold "> {msg.message}</span>
              </p>
              <button className="py-2 rounded-xl w-full    bg-red-300 hover:bg-red-400 text-white font-semibold mx-auto "
               onClick={() => DeleteMessage(msg._id)}>Delete</button>
              <p className="text-gray-400 italic text-sm">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
