import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = ({
  title,
  information,
  buttonText,
  imgSrc,
  authType,
  authNavLink,
}) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData
        
);
      console.log("Response:", response.data);
    const {token}=response.data;
    localStorage.setItem("auth-token",token)
      setIsLoading(false);
  
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full max-w-6xl min-h-0 md:min-h-[800px] font-raleway bg-white rounded-xl overflow-hidden shadow-2xl">
       
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 md:col-span-2 flex flex-col justify-center items-center mx-auto w-full max-w-lg p-6 gap-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center"
          >
            <img
              src="/fruit salad-cuate.svg"
              className="w-20 h-20"
              alt="Logo"
            />
          </motion.div>

          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-bold mb-2 text-gray-800"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-medium text-gray-500"
            >
              {information}
            </motion.p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full p-2 md:p-5"
          >
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col mb-1"
            >
              <label
                htmlFor="firstname"
                className="font-medium text-sm mb-1 text-gray-700"
              >
                Username
              </label>
              <input
                placeholder="john@example.com"
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-3 text-sm bg-anzac-50 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 outline-none"
                name="username"
                value={formData.username}
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col"
            >
              <label
                htmlFor="password"
                className="font-medium text-sm mb-1 text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-3 text-sm bg-anzac-50 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 outline-none"
                name="password"
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-sunglow-300 hover:bg-blue-violet-700 rounded-lg p-3 font-medium text-white text-sm mt-2 shadow-md flex justify-center items-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Processing..." : buttonText}
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="text-sm text-center mt-2 text-gray-600"
            >
              {authType}
              <span
                className="text-blue-violet-600 hover:text-blue-violet-800 underline cursor-pointer ml-1 font-medium transition-colors duration-200"
                onClick={() => navigate("/login")}
              >
                {authNavLink}
              </span>
            </motion.p>
          </form>
        </motion.div>

       
        <div className="hidden md:flex md:col-span-2 justify-center items-center perspective relative">
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-full preserve-3d"
          >
      
            <div className="absolute w-full h-full backface-hidden">
              <img
                src={imgSrc}
                alt="Sign up illustration"
                className="w-full h-full object-cover"
              />

            
              <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">
                  Create Your Account
                </h3>
                <p className="text-white text-sm mb-6">
                  Join our community today
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFlip}
                  className="bg-white text-blue-violet-600 px-6 py-3 rounded-lg shadow-lg font-medium text-sm self-start hover:bg-blue-50 transition-all duration-200"
                >
                  Learn More
                </motion.button>
              </div>
            </div>

         
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <img
                src="/Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus hendrerit est nec pulvinar..png"
                alt="Login illustration"
                className="w-full h-full object-cover"
              />

          
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
