import "./styles/App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Subtopic from "./pages/Subtopic";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className=" w-full min-h-screen bg-cyan-50">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signup/" element={<Signup />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/:topicSlug/:subtopicSlug/" element={<Subtopic />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
