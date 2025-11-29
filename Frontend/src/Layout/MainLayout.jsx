// src/Layout/MainLayout.jsx
import NavBar from "../components/NavBar";

export default function MainLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}