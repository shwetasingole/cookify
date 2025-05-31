import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "Cookify",
      text: "Hello! I'm Cookify, your cooking assistant. Ask me anything about recipes, ingredients, or cooking techniques!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    setMessages([...messages, { sender: "user", text: input }]);
    setLoading(true);
    setInput("");

    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post(
        `${API_URL}/recipes/chat`,
        {
          messages,
          input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reply =
        response.data.reply || response.data.message || response.data;
      setMessages((prev) => [...prev, { sender: "Cookify", text: reply }]);
    } catch (error) {
      console.error("Error fetching data from Gemini API", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "Cookify",
          text: "Sorry, I'm having trouble connecting to my cooking brain. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full container mx-auto">
      <div className=" mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Illustration and info */}
          <div className="md:w-1/3 lg:w-2/5">
            <div className="sticky top-8 bg-white rounded-2xl shadow-lg p-6 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Cookify Assistant
              </h1>
              <div className="w-full max-w-xs mx-auto my-6">
                <img
                  src="/Illustration Cooking Sticker by Carolynn - Find & Share on GIPHY.gif"
                  alt="Cooking Assistant"
                  className="w-full h-auto rounded-xl mx-auto"
                />
              </div>
              <div className="space-y-3 mt-6 text-left">
                <h3 className="font-semibold text-lg">Try asking about:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 mr-2 inline-flex items-center justify-center bg-sunglow-100 text-sunglow-500 rounded-full">
                      •
                    </span>
                    Recipe suggestions for your ingredients
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 mr-2 inline-flex items-center justify-center bg-sunglow-100 text-sunglow-500 rounded-full">
                      •
                    </span>
                    Cooking techniques and tips
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 mr-2 inline-flex items-center justify-center bg-sunglow-100 text-sunglow-500 rounded-full">
                      •
                    </span>
                    Food substitutions and alternatives
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 mr-2 inline-flex items-center justify-center bg-sunglow-100 text-sunglow-500 rounded-full">
                      •
                    </span>
                    Meal planning and nutritional advice
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[75vh] md:h-[80vh] flex flex-col">
              {/* Chat header */}
              <div className="bg-sunglow-400 text-white py-4 px-6">
                <h2 className="text-xl font-semibold">Chat with Cookify</h2>
                <p className="text-sunglow-100 text-sm">
                  Your personal cooking assistant
                </p>
              </div>

              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="flex flex-col space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                          msg.sender === "user"
                            ? "bg-sunglow-300 text-white rounded-tr-none"
                            : "bg-gray-800 text-white border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        {!msg ? (
                          <p>noo message</p>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"></div>
                          <div
                            className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input form */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 p-4 bg-white"
              >
                <div className="flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Ask Cookify anything about cooking..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sunglow-400 focus:border-transparent"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 ml-3 bg-sunglow-400 text-white rounded-r-lg hover:bg-sunglow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sunglow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send your message
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
