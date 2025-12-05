import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";

import ProtectedRoute from "./context/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;
