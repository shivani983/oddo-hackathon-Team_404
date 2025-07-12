import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UploadItem from "./components/UploadItem"; 
import ItemsList from "./components/ItemsList";
import SwapRequests from "./components/SwapRequests";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ReWear App</h1>

      {token ? (
        <>
          <Dashboard />
          <UploadItem />
        </>
      ) : (
        <div className="flex justify-around">
          <Signup onSuccess={handleLoginSuccess} />
          <Login onSuccess={handleLoginSuccess} />
        </div>
      )}

      <ItemsList /> {/* Anyone can view listed items */}
      <SwapRequests />

    </div>
  );
}

export default App;