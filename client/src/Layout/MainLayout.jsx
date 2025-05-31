import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen font-raleway">
      {/* Navbar */}
      <Navbar
        navitem1="Home"
        navitem2="Chat with Cookify"
        navitem3="Generate Recipes"
        navitem4="Log Out"
      />

      {/* Main Content */}
      <div className="py-6 flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
