import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Section from "./pages/Section";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section" element={<Section />} />
      </Routes>
    </Router>
  );
}

export default App;
