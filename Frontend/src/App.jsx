import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import IntegratedFitness from "./Pages/IntegratedFitness"; // <- new combined page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/integrated" element={<IntegratedFitness />} />
      </Routes>
    </Router>
  );
}
