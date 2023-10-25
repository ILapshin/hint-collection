import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Subtopic from "./pages/Subtopic";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/subtopics/:subtopicId" element={<Subtopic />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
