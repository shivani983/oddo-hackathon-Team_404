import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Update token when user logs in
  useEffect(() => {
    const stored = localStorage.getItem("token");
    setToken(stored);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ReWear App</h1>

      {token ? (
        <Dashboard />
      ) : (
        <div className="flex justify-around">
          <Signup onSuccess={() => setToken(localStorage.getItem("token"))} />
          <Login onSuccess={() => setToken(localStorage.getItem("token"))} />
        </div>
      )}
    </div>
  );
}

export default App;
