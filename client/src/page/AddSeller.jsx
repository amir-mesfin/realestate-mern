import React, { useEffect, useState } from 'react'

export default function AddSeller() {
  const [error, setError] = useState(null);
  const [requestUser, setRequestUser] = useState([]);

  useEffect(() => {
    const GetProve = async () => {
      try {
        const res = await fetch("/api/user/requestSeller");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setRequestUser(data);
      } catch (err) {
        setError("Failed to load seller requests.");
      }
    };
    GetProve();
  }, []);

  const acceptSeller = async (userId) => {
    try {
      const res = await fetch(`/api/user/accept/requestSeller/${userId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      // Remove accepted user from the list
      setRequestUser((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      setError("Something went wrong while accepting seller.");
    }
  };

  // Show empty state if no requests
  if (requestUser.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-blue-900 text-2xl sm:text-3xl font-semibold mb-3">
          Add Seller
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          No user has requested to become a seller yet.
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-blue-900 text-2xl font-semibold mx-auto">Add Seller</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="flex flex-col gap-6 mt-5">
        {requestUser.map((userList) => (
          <div className="flex justify-between items-center p-4 bg-white shadow rounded-xl" key={userList._id}>
            <div className="flex items-center gap-5">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={userList.avatar}
                alt={userList.username}
              />
              <div className="flex flex-col">
                <p className="text-slate-700 font-semibold">{userList.username}</p>
                <p className="text-slate-400 text-sm">{userList.email}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 transition py-2 px-5 rounded-xl text-white"
              onClick={() => acceptSeller(userList._id)}
            >
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
