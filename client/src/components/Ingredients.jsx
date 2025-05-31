import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Ingredients() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mealType: "",
    cuisine: "",
    servingSize: "",
    dietaryRestrictions: "",
    allergicIngredients: "",
    cookingTime: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otherCuisine, setOtherCuisine] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const addIngredient = () => {
    const trimmedInput = inputValue.trim().toLowerCase();

    const isValid =
      /^[a-zA-Z\s]+$/.test(trimmedInput) &&
      trimmedInput.length > 1 &&
      !trimmedInput.includes("blah") &&
      trimmedInput.split(" ").length <= 3;

    if (!isValid) {
      setErrorMessage("Please enter a valid ingredient name.");
      return;
    }

    setIngredients([...ingredients, trimmedInput]);
    setInputValue("");
    setErrorMessage("");
  };

  const removeIngredient = (indexToRemove) => {
    const filteredIngredients = ingredients.filter(
      (_, index) => index !== indexToRemove
    );
    setIngredients(filteredIngredients);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (ingredients.length === 0) {
      setErrorMessage("Please add at least one ingredient");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post(
        `${API_URL}/recipes/generate`,
        {
          ingredients,
          formData: { ...formData, otherCuisine },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipes(response.data.recipes);
      setResponseMessage("");
    } catch (error) {
      console.error("Error generating recipe:", error);
      setErrorMessage("Failed to generate the recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setActiveStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (recipes.length > 0) {
      console.log("Storing recipes:", recipes);
      const token = localStorage.getItem("auth-token");
      axios
        .post(
          `${API_URL}/recipes/insert`,
          { recipes },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => console.log("Recipes stored"))
        .catch((error) => console.error("Failed to store recipes:", error));
    }
  }, [recipes]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Recipe
          </h1>
          <p className="text-gray-600 text-lg">
            Tell us what you have and your preferences, and we'll suggest
            delicious meals!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-center items-center mb-6">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                activeStep === 1
                  ? "bg-sunglow-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } font-bold transition-colors duration-300`}
            >
              1
            </div>
            <div
              className={`h-1 w-20 ${
                activeStep === 2 ? "bg-sunglow-500" : "bg-gray-200"
              } transition-colors duration-300`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                activeStep === 2
                  ? "bg-sunglow-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } font-bold transition-colors duration-300`}
            >
              2
            </div>
          </div>
          <div className="flex justify-center text-sm">
            <span className="w-24 text-center font-medium">Preferences</span>
            <span className="w-24 text-center font-medium">Ingredients</span>
          </div>
        </div>

        {activeStep === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Meal Preferences
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="mealType"
                  >
                    Meal Type
                  </label>
                  <select
                    id="mealType"
                    name="mealType"
                    value={formData.mealType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                  >
                    <option value="">Select a meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="servingSize"
                  >
                    Serving Size
                  </label>
                  <input
                    type="number"
                    id="servingSize"
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                    placeholder="Number of servings"
                    min="1"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="cuisine"
                  >
                    Cuisine Type
                  </label>
                  <select
                    id="cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors mb-2"
                  >
                    <option value="">Select cuisine type</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Thai">Thai</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Japanese">Japanese</option>
                    <option value="French">French</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="other">Other</option>
                  </select>

                  {formData.cuisine === "other" && (
                    <input
                      type="text"
                      value={otherCuisine}
                      onChange={(e) => setOtherCuisine(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                      placeholder="Specify cuisine type"
                    />
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="cookingTime"
                  >
                    Cooking Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="cookingTime"
                    id="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                    placeholder="e.g., 30"
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="dietaryRestrictions"
                  >
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                    placeholder="e.g., Vegetarian, Vegan, Gluten-Free"
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="allergicIngredients"
                  >
                    Allergic Ingredients
                  </label>
                  <input
                    type="text"
                    id="allergicIngredients"
                    name="allergicIngredients"
                    value={formData.allergicIngredients}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                    placeholder="e.g., Nuts, Dairy"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-sunglow-500 hover:bg-sunglow-600 text-white font-medium py-3 px-6 rounded-lg shadow transition-colors duration-300"
                >
                  Add Ingredients
                </button>
              </div>
            </form>
          </div>
        )}

        {activeStep === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add Your Ingredients
            </h2>

            <div className="mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addIngredient();
                }}
                className="mb-4"
              >
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add ingredient"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunglow-400 focus:border-sunglow-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue}
                    className="bg-sunglow-500 hover:bg-sunglow-600 text-white font-bold py-3 px-5 mx-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    Add
                  </button>
                </div>
              </form>

              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  {ingredients.length === 0
                    ? "Add the ingredients you have available"
                    : `Added ingredients (${ingredients.length}):`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-sunglow-50 text-gray-800 rounded-full px-4 py-2 transition-all hover:bg-sunglow-100"
                    >
                      <span>{ingredient}</span>
                      <button
                        onClick={() => removeIngredient(index)}
                        className="ml-2 bg-white text-gray-500 hover:text-red-500 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                        aria-label="Remove ingredient"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="border border-gray-300 bg-white text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
              >
                Back to Preferences
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={ingredients.length === 0 || loading}
                className="bg-sunglow-500 hover:bg-sunglow-600 text-white font-medium py-3 px-6 rounded-lg shadow transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Recipes"}
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src="/Illustration Cooking Sticker by Carolynn - Find & Share on GIPHY.gif"
              alt="Cooking in progress..."
              className="w-64 h-64 object-contain mb-4"
            />
            <p className="text-lg text-gray-600 animate-pulse">
              Cooking up some delicious recipes for you...
            </p>
          </div>
        )}

        {/* Recipe Results */}
        {!loading && recipes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Recipes Just For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-sunglow-100 to-sunglow-300 py-4 px-6">
                    <h3 className="font-bold text-xl text-gray-800">
                      {recipe.recipe_name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-white bg-opacity-30 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {recipe.meal_type}
                      </span>
                      <span className="bg-white bg-opacity-30 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {recipe.cuisine_type || recipe.cuisuine_type}
                      </span>
                      <span className="bg-white bg-opacity-30 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {recipe.preparation_time} min
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">SERVING</p>
                          <p className="font-medium">{recipe.serving_size}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">CALORIES</p>
                          <p className="font-medium">{recipe.calories}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">DIET TYPE</p>
                          <p className="font-medium text-green-600">
                            {recipe.diet_type}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">ALLERGENS</p>
                          <p className="font-medium text-amber-600">
                            {recipe.allergy_information}
                          </p>
                        </div>
                      </div>

                      <details className="mb-4">
                        <summary className="font-medium text-gray-800 cursor-pointer hover:text-sunglow-500 transition-colors">
                          Ingredients
                        </summary>
                        <div className="pl-4 mt-2 border-l-2 border-gray-200">
                          <ul className="space-y-1">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="text-gray-700">
                                • {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>

                      <details>
                        <summary className="font-medium text-gray-800 cursor-pointer hover:text-sunglow-500 transition-colors">
                          Instructions
                        </summary>
                        <div className="pl-4 mt-2 border-l-2 border-gray-200">
                          <ol className="space-y-3">
                            {recipe.instructions.map((step, idx) => (
                              <li key={idx} className="text-gray-700">
                                <span className="font-medium text-sunglow-500 mr-2">
                                  {idx + 1}.
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ingredients;
