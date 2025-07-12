import logo from './logo.svg';
import './App.css';

import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ReWear Auth Test</h1>
      <div className="flex justify-around">
        <Signup />
        <Login />
      </div>
    </div>
  );
}

export default App;
