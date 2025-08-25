import React, { useState } from 'react';

export default function AddAdmin() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddAdmin = async () => {
    if (!email) {
      setError('Please enter an email');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/user/make-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        setSuccess(`User ${email} is now an admin!`);
        setEmail('');
      }
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // console.log(email);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-700">Add Admin to Abushe Real Estate</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-4 w-full rounded-lg  mb-8"
      />

      <button
        onClick={handleAddAdmin}
        disabled={loading}
        className="bg-blue-600 text-white p-4 rounded-lg w-full hover:opacity-90"
      >
        {loading ? 'Adding...' : 'Add Admin'}
      </button>
    </div>
  );
}
