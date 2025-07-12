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
    <div className="max-w-md mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Points:</strong> {user.points}</p>
          <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
