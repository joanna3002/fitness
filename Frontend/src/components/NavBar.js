import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      padding: "15px",
      background: "#111",
      color: "#fff",
      fontSize: "18px",
      fontWeight: "600"
    }}>
      <Link to="/" style={{ color: "#00ff88", textDecoration: "none" }}>Home</Link>
      <Link to="/meal" style={{ color: "#00ff88", textDecoration: "none" }}>Meal Planner</Link>
      <Link to="/coach" style={{ color: "#00ff88", textDecoration: "none" }}>Chat Coach</Link>
    </nav>
  );
}