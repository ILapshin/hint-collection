import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Subtopic from "./pages/Subtopic";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className=" w-full">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/subtopics/:subtopicId" element={<Subtopic />} />
            <Route path="/signup/" element={<Signup />} />
            <Route path="/login/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
