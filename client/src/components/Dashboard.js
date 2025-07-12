import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: token },
      });

      const data = await res.json();
      if (res.ok) setUser(data);
      else alert("Unauthorized or invalid token");
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 text-center animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">👤 My Profile</h2>

      {user ? (
        <div className="space-y-3">
          <div className="text-left">
            <p className="text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Points:</strong>{" "}
              <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {user.points}
              </span>
            </p>
            {user.isAdmin && (
              <p className="text-sm text-yellow-600 mt-2">🛡 Admin Account</p>
            )}
          </div>

          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 transition text-white font-semibold px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;