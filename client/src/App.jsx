import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import { SearchRecipe } from "./components/SearchRecipe";
import { Suspense, lazy } from "react";

import MainLayout from "./Layout/MainLayout";
import { LogIn } from "lucide-react";
import Login from "./components/Login";
const Chatbot = lazy(() => import("./components/Chatbot"));
const Ingredients = lazy(() => import("./components/Ingredients"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/ingredients",
          element: (
            <Suspense fallback={<div>Loading Ingredients...</div>}>
              <Ingredients />
            </Suspense>
          ),
        },
        {
          path: "/chatbot",
          element: (
            <Suspense fallback={<div>Loading chatbot...</div>}>
              <Chatbot />
            </Suspense>
          ),
        },
        {
          path: "/search",
          element: <SearchRecipe />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Login
          title="Login to our platform"
          information="Welcome to cookify for personalized recipes"
          buttonText="Login"
          imgSrc="/Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus hendrerit est nec pulvinar..png"
          authType="Not a customer?"
          authNavLink="Sign Up"
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
