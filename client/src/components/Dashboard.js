import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: token },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        alert("Unauthorized or session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.reload();
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.name} 👋</h2>
        <div className="space-y-3 text-left">
          <p><span className="font-semibold">📧 Email:</span> {user.email}</p>
          <p><span className="font-semibold">🌟 Points:</span> {user.points}</p>
          <p><span className="font-semibold">🆔 User ID:</span> {user._id}</p>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;