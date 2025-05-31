import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export const SearchRecipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    

    setLoading(true);
    setError(null);
    const token =localStorage.getItem("auth-token");
    try {
      const response = await axios.get(`${API_URL}/recipes/search?q=${query}`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setRecipes(response.data);
      setQuery("");
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Find Your Perfect Recipe</h1>
        <p className="text-gray-600 max-w-lg mx-auto">Search from our collection of delicious recipes for any occasion</p>
      </motion.div>
      
      {/* Search Form */}
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSearch} 
        className="w-full max-w-2xl mx-auto mb-12"
      >
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl shadow-lg">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for pasta, salad, breakfast ideas..."
            className="flex-grow p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </>
            )}
          </motion.button>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-500 mt-2 text-center"
          >
            No recipes found
          </motion.p>
        )}
      </motion.form>

      {/* Results Section */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-amber-200 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Finding delicious recipes for you...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {recipes.length === 0 ? (
               
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No recipes found. Try another search term.</p>
                </div>
            
            ) : (
              recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.img}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      alt={recipe.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4">
                        <p className="text-white text-sm font-medium">
                          <span className="mr-3">⏱️ {recipe.time}</span>
                          <span className="mr-3">👥 {recipe.servings}</span>
                          <span>🔥 {recipe.calories}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{recipe.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{recipe.dietType}</span>
                      {recipe.allergyInfo && (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          {recipe.allergyInfo}
                        </span>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpenModal(recipe.title)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <span>View Recipe</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
            onClick={() => setOpenModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {recipes
                .filter((recipe) => recipe.title === openModal)
                .map((recipe) => (
                  <div key={recipe.id} className="flex flex-col">
                    <div className="relative h-56 md:h-64">
                      <img
                        src={recipe.img}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <button 
                          onClick={() => setOpenModal(false)}
                          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6">
                          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{recipe.title}</h1>
                          <div className="flex flex-wrap gap-3">
                            <span className="text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                              ⏱️ {recipe.time}
                            </span>
                            <span className="text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                              🔥 {recipe.calories} calories
                            </span>
                            {recipe.servings && (
                              <span className="text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                👥 {recipe.servings}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 overflow-y-auto max-h-[calc(80vh-16rem)]">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.dietType && (
                          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            {recipe.dietType}
                          </span>
                        )}
                        {recipe.allergyInfo && (
                          <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
                            Allergy: {recipe.allergyInfo}
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                          <span className="mr-2">🧂</span>
                          Ingredients
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="mr-2 text-amber-500">•</span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                          <span className="mr-2">👨‍🍳</span>
                          Instructions
                        </h2>
                        <ol className="flex flex-col gap-4">
                          {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center font-medium">
                                {index + 1}
                              </span>
                              <p className="text-gray-700">{instruction}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-100">
                      <button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                        onClick={() => setOpenModal(false)}
                      >
                        Close Recipe
                      </button>
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};