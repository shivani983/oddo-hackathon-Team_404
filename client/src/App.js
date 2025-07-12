<<<<<<< HEAD
import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UploadItem from "./components/UploadItem";
import ItemsList from "./components/ItemsList";
import SwapRequests from "./components/SwapRequests";
import MyItems from "./components/MyItems";
import MyRequests from "./components/MyRequests";
import MySwaps from "./components/MySwaps";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAdmin = token ? JSON.parse(atob(token.split(".")[1]))?.isAdmin : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-center w-full text-indigo-600 drop-shadow-sm animate-fade-in">
          👕 ReWear Clothing Swap
        </h1>

        {token && (
          <button
            onClick={handleLogout}
            className="absolute right-4 top-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
          >
            Logout
          </button>
        )}
      </header>

      {token ? (
        <div className="space-y-10">
          <section className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <Dashboard />
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <UploadItem />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <MyItems />
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <MyRequests />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <SwapRequests />
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <MySwaps />
          </section>

          {isAdmin && (
            <section className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow-lg p-6 animate-fade-in">
              <AdminPanel />
            </section>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <Signup onSuccess={handleLoginSuccess} />
          </div>
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <Login onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      <section className="mt-10 bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <ItemsList />
      </section>
    </div>
  );
}

export default App;
=======
>>>>>>> 613664d0b961cb136f4e19b9672b473e2717d9f1
