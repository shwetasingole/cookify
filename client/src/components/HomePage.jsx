import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import DetailsDemo from "./DetailsDemo";
import CoreCarousel from "./CoreCarousel";

function HomePage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const recipes = [
    {
      id: 1,
      title: "Creamy Meatballs & Pasta",
      time: "35 Minutes",
      servings: "4 Servings",
      calories: "210 Calories",
      img: "Poke bowl-pana.svg",
      mealType: "Dinner",
      dietType: "Non-Vegetarian",
      allergyInfo: "Contains Dairy, Gluten, and Soy",
      ingredients: [
        "Ground beef",
        "Breadcrumbs",
        "Egg",
        "Parmesan cheese",
        "Heavy cream",
        "Spaghetti",
        "Olive oil",
        "Garlic",
        "Salt",
        "Pepper",
      ],
      instructions: [
        " Combine ground beef, breadcrumbs, egg, Parmesan cheese, salt, and pepper in a bowl. Mix well to form meatballs.",
        " Heat olive oil in a pan and cook the meatballs until browned on all sides. Remove and set aside.",
        " In the same pan, sauté garlic until fragrant. Add heavy cream and simmer for 2 minutes.",
        " Add the cooked meatballs back to the pan and let them simmer in the sauce for 10 minutes.",
        " Cook spaghetti according to package instructions, then drain.",
        " Serve the meatballs and creamy sauce over the spaghetti. Garnish with additional Parmesan cheese if desired.",
      ],
    },
    {
      id: 2,
      title: "Sweet And Spicy Barbecue Wings",
      time: "15 Minutes",
      servings: "2 Servings",
      calories: "460 Calories",
      img: "healthy food-cuate.svg",
      mealType: "Dinner",
      dietType: "Non-Vegetarian",
      allergyInfo: "Contains Dairy, Gluten, and Soy",
      ingredients: [
        "Chicken wings",
        "Barbecue sauce",
        "Honey",
        "Chili flakes",
        "Salt",
        "Pepper",
        "Oil",
      ],
      instructions: [
        " Preheat your oven to 400°F (200°C).",
        " Season chicken wings with salt and pepper.",
        " In a bowl, mix barbecue sauce, honey, and chili flakes.",
        " Toss the wings in the sauce mixture until fully coated.",
        " Arrange the wings on a baking sheet lined with parchment paper.",
        " Bake for 20–25 minutes, flipping halfway through, until the wings are caramelized and cooked through.",
        " Serve hot with extra barbecue sauce on the side.",
      ],
    },
    {
      id: 3,
      title: "Fresh Pesto Pasta With Peas",
      time: "40 Minutes",
      servings: "4 Servings",
      calories: "263 Calories",
      img: "fruit salad-amico.svg",
      mealType: "Dinner",
      dietType: "Vegetarian",
      allergyInfo: "Contains Dairy, Gluten, and Soy",
      ingredients: [
        "Pasta",
        "Fresh basil",
        "Garlic",
        "Parmesan cheese",
        "Pine nuts",
        "Olive oil",
        "Peas",
        "Salt",
        "Pepper",
      ],
      instructions: [
        " Cook pasta according to package instructions. Reserve 1 cup of pasta water and drain the rest.",
        " In a food processor, blend basil, garlic, Parmesan cheese, pine nuts, olive oil, salt, and pepper until smooth.",
        " Blanch the peas in boiling water for 2 minutes, then drain and set aside.",
        " Toss the cooked pasta with the pesto sauce, adding reserved pasta water a little at a time to loosen the sauce as needed.",
        " Stir in the blanched peas.",
        " Serve immediately with additional Parmesan cheese and a drizzle of olive oil on top.",
      ],
    },
  ];

  return (
    <div className="relative ">
      {/* Foreground content */}
      <div className="relative z-10">
      <section className="max-w-7xl mx-auto mb-10 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left pt-16 md:pt-20 lg:pt-24 order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Healthy Cooking Recipes and the Right{" "}
              <span className="text-amber-400 italic inline-block transform hover:scale-105 transition-transform duration-300">
                Nutrition.
              </span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
              Every great dish starts with a simple ingredient, a spark of
              inspiration and the willingness to get your hands a little dirty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                onClick={() => navigate("/ingredients")}
              >
                Explore Recipes
              </button>
              
              <button
                className="bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 px-8 py-3 rounded-full font-medium transition-all duration-300"
                onClick={() => navigate("/chatbot")}
              >
                Ask Chef AI
              </button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative mt-5">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-100 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200 rounded-full opacity-60"></div>
            
            <div className="relative transform transition-transform duration-500 hover:scale-105">
              <img 
                src="/female chef-amico.svg" 
                alt="Chef preparing healthy food" 
                className=" mx-auto"
              />
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-md hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full h-3 w-3"></div>
                  <p className="text-sm font-medium">1000+ Recipes Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="flex justify-center lg:justify-start mt-12 gap-8 px-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-amber-500">200+</p>
            <p className="text-sm text-gray-600">Chefs</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-amber-500">1000+</p>
            <p className="text-sm text-gray-600">Recipes</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-amber-500">10k+</p>
            <p className="text-sm text-gray-600">Users</p>
          </div>
        </div> */}
      </section>
    </div>
 
     
        <section className="my-10 py-10 px-5 bg-sunglow-50">
          <div className="flex flex-col gap-4 text-center">
            <h4 className="text-xl text-sunglow-300 font-bold font-poppins">
              How it Works
            </h4>
            <h2 className="text-3xl text-black font-bold font-poppins">
              What we serve
            </h2>
            <h2 className="text-2xl text-gray-600 font-bold font-poppins">
              Product quality is our priortiy, and always guarantees freshness
              and safety<br></br> until it is in your hands
            </h2>
          </div>
          <div className="flex flex-col gap-5  ">
            <div className="grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-7 lg:mx-10 mt-10 ">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className=" sm:flex-col md:flex md:flex-row  bg-white rounded-md md:rounded-l-full  md:rounded-r-lg   items-center shadow-md transform transition-transform hover:scale-95"
                >
                  <img
                    src={recipe.img}
                    className="w-36 h-36 rounded-full md:-ml-2 object-fit"
                    alt={recipe.title}
                  />
                  <div className="px-4 flex flex-col gap-2 p-3">
                    <h1 className="text-2xl font-bold">{recipe.title}</h1>
                    <p className="text-xl text-gray-500">
                      {recipe.time} | {recipe.servings} | {recipe.calories}
                    </p>
                    <button
                      className="bg-black p-1 rounded-full text-white flex justify-between w-16 px-2 transform transition-transform hover:scale-105"
                      onClick={() => setOpenModal(recipe.id)} // Set the visible index to the current recipe's index
                    >
                      <box-icon
                        name="chevron-right"
                        color="#ffffff"
                        className="px-2"
                      ></box-icon>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {openModal && (
                <div className="fixed  inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                  <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full overflow-auto max-h-[600px]">
                    {recipes
                      .filter((recipe) => recipe.id === openModal)
                      .map((recipe) => (
                        <div key={recipe.id} className="text-gray-900">
                          <img
                            src={recipe.img}
                            alt={recipe.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h1 className="text-2xl font-semibold mb-2">
                            {recipe.title}
                          </h1>
                          <p className="text-gray-700">
                            ⏳ {recipe.time} | 🔥 {recipe.calories} calories
                          </p>
                          <p className="text-gray-600 mt-2">
                            Allergy Info: {recipe.allergyInfo}
                          </p>
                          <p className="text-gray-600">
                            Diet Type: {recipe.dietType}
                          </p>

                          <div className="mt-4">
                            <p className="text-gray-700">
                              <strong>Ingredients:</strong>{" "}
                              {recipe.ingredients.join(", ")}
                            </p>
                          </div>

                          <h2 className="mt-4 font-semibold">Instructions:</h2>
                          <ul className=" flex flex-col gap-2 list-decimal list-inside text-gray-700">
                            {recipe.instructions.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ul>

                          <button
                            className="mt-6 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                            onClick={() => setOpenModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-900 rounded-xl text-white font-poppins p-2"
                onClick={() => navigate("/search")}
              >
                Search More
              </button>
            </div>
          </div>
        </section>
        <section className="my-10 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col gap-4 px-10 font-poppins ">
              <h4 className="text-2xl text-sunglow-300 font-bold">
                What they say
              </h4>
              <h2 className="text-4xl text-black font-bold">
                What Our Customers Say
                <br /> About Us
              </h2>

              <div>
                <CoreCarousel />
              </div>
              <div class="relative  rounded-lg overflow-hidden">
                <img
                  class="w-full h-auto filter brightness-75"
                  src="/pexels-karolina-grabowska-4022107.jpg"
                  alt="image"
                />

                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white py-2 px-4 rounded-lg">
                  <button onClick={() => navigate("/ingredients")}>
                    Click Me
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block lg:py-10">
              <DetailsDemo />
            </div>
          </div>
        </section>

        {/* Recipe Cards */}

        <section className="bg-sunglow-50 px-10">
          <div></div>
        </section>
      </div>

  );
}

export default HomePage;
