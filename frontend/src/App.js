import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Subtopic from "./pages/Subtopic";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/subtopics/:subtopicId" element={<Subtopic />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
