import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
        color: "#fff",
        background: "#121212",
        minHeight: "70vh",
        borderRadius: 12,
        marginTop: 20,
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Welcome to AI Fitness Coach</h1>
      <p style={{ opacity: 0.8, marginBottom: 40 }}>
        Use the all-in-one platform for meal planning, workouts, and AI coaching.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 300,
          margin: "0 auto",
        }}
      >
        <Link to="/integrated">
          <button
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: 10,
              border: "none",
              fontSize: 18,
              background: "#00e676",
              color: "#000",
              fontWeight: 700,
            }}
          >
            🚀 Open Integrated Fitness Platform
          </button>
        </Link>
      </div>
    </div>
  );
}
