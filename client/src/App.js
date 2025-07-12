import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UploadItem from "./components/UploadItem";
import ItemsList from "./components/ItemsList";
import SwapRequests from "./components/SwapRequests";
import MyItems from "./components/MyItems";
import MyRequests from "./components/MyRequests";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ReWear App</h1>

      {token ? (
        <>
          <div className="text-right mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <Dashboard />

          {/* Upload and item interactions */}
          <UploadItem />
          <MyItems />
          <MyRequests />
          <SwapRequests />
        </>
      ) : (
        <div className="flex justify-around flex-wrap gap-6">
          <Signup onSuccess={handleLoginSuccess} />
          <Login onSuccess={handleLoginSuccess} />
        </div>
      )}

      {/* Public browsing for all users */}
      <ItemsList />
    </div>
  );
}

export default App;
