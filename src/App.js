import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
