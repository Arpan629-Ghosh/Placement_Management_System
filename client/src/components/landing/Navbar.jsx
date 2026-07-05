import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src={logo} className="w-10 h-10" />
        <h1 className="text-xl font-bold tracking-wide">PMS</h1>
      </div>

      <div className="flex gap-6 items-center">
        <button
          onClick={() => scrollToSection("home")}
          className="hover:text-blue-400 transition"
        >
          Home
        </button>

        <button
          onClick={() => scrollToSection("features")}
          className="hover:text-blue-400 transition"
        >
          Features
        </button>

        <button
          onClick={() => scrollToSection("demo")}
          className="hover:text-blue-400 transition"
        >
          Demo
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 px-4 py-1.5 rounded-md hover:bg-blue-600 transition shadow-md hover:shadow-blue-500/30"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
