import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ navitem1, navitem2, navitem3,navitem4 }) {
  const [activeState, setActiveState] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  return (
    <div className="relative">
      <div className="flex justify-between items-center mx-4 px-4 lg:px-20 py-6 rounded-2xl  mt-5 bg-amber-50 shadow">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-2xl text-black ">
         
           <img src="/fruit salad-cuate.svg" className="w-10" />
          
          <span>Cookify</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex gap-8 font-semibold items-center">
            <li>
              <button
                onClick={() => {
                  setActiveState("/");
                  navigate("/");
                }}
                className={`hover:font-bold focus:outline-none hover:tracking-wider transition-all duration-300 px-2 py-1 ${
                  activeState === "/" ? "border-b-4 border-amber-500" : ""
                }`}
              >
                {navitem1 || "Home"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveState("/chatbot");
                  navigate("/chatbot");
                }}
                className={`hover:font-bold focus:outline-none hover:tracking-wider transition-all duration-300 px-2 py-1 ${
                  activeState === "/chatbot"
                    ? "border-b-4 border-amber-500"
                    : ""
                }`}
              >
                {navitem2 || "Chatbot"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveState("/ingredients");
                  navigate("/ingredients");
                }}
                className={`hover:font-bold focus:outline-none hover:tracking-wider transition-all duration-300 px-2 py-1 ${
                  activeState === "/ingredients"
                    ? "border-b-4 border-amber-500"
                    : ""
                }`}
              >
                {navitem3 || ""}
              </button>
              
            </li>
            <li>
        
          <button className="bg-sunglow-500 p-3 rounded-full text-white" onClick={handleLogOut}>
          {navitem4 || "Log Out"}
          </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-amber-100 focus:outline-none"
            aria-label="Menu"
          >
            <Menu size={24} className="text-amber-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute md:hidden top-full left-0 right-0 w-full bg-white shadow-lg rounded-b-lg z-50 transform transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          <button
            onClick={() => {
              navigate("/");
              setActiveState("/");
              setIsMenuOpen(false);
            }}
            className={`p-3 rounded-lg text-left font-medium transition-colors ${
              activeState === "/"
                ? "bg-amber-100 text-amber-800"
                : "hover:bg-amber-50"
            }`}
          >
            {navitem1 || "Home"}
          </button>
          <button
            onClick={() => {
              navigate("/chatbot");
              setActiveState("/chatbot");
              setIsMenuOpen(false);
            }}
            className={`p-3 rounded-lg text-left font-medium transition-colors ${
              activeState === "/chatbot"
                ? "bg-amber-100 text-amber-800"
                : "hover:bg-amber-50"
            }`}
          >
            {navitem2 || "Chatbot"}
          </button>
          <button
            onClick={() => {
              navigate("/ingredients");
              setActiveState("/ingredients");
              setIsMenuOpen(false);
            }}
            className={`p-3 rounded-lg text-left font-medium transition-colors ${
              activeState === "/ingredients"
                ? "bg-amber-100 text-amber-800"
                : "hover:bg-amber-50"
            }`}
          >
            {navitem3 || "Ingredients"}
          </button>
          <button className="bg-sunglow-200 p-3 rounded" onClick={handleLogOut}>
          {navitem4 || "Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
