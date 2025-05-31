import React from 'react';

export default function Testimonials({name,rating,feedback}) {
    const testimonials = [
    {
        name: "Naura Silvana",
        image: "woman.jpg",
        rating: 4,
        feedback: "Cookify has completely changed the way I plan my meals. Super easy to use!",
    },
    {
        name: "James Carter",
        image: "man.jpg",
        rating: 5,
        feedback: "Absolutely love it! The recipe suggestions are spot on and save me so much time.",
    },
    {
        name: "Emily Brown",
        image: "woman2.jpg",
        rating: 5,
        feedback: "A must-have for anyone who loves cooking! The chatbot feature is really helpful.",
    },
];
    return (
        
            <div class="max-w-lg h-48 rounded-lg border border-gray-200 p-4 bg-gray-100 shadow- font-poppins">
                <div class="flex items-center mb-4">
                    <img class="w-12 h-12 rounded-full mr-4" src="woman.jpg" alt="profile picture" />
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">{name}</h3>
                            <div class="flex text-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-3.5 2 1-4-3-2.5 3.5-.5L10 6l1.5 3.5 3.5.5-3 2.5 1 4z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-3.5 2 1-4-3-2.5 3.5-.5L10 6l1.5 3.5 3.5.5-3 2.5 1 4z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-3.5 2 1-4-3-2.5 3.5-.5L10 6l1.5 3.5 3.5.5-3 2.5 1 4z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-3.5 2 1-4-3-2.5 3.5-.5L10 6l1.5 3.5 3.5.5-3 2.5 1 4z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-3.5 2 1-4-3-2.5 3.5-.5L10 6l1.5 3.5 3.5.5-3 2.5 1 4z" /></svg>
                            </div>
                        </div>
                </div>
                <p class="text-gray-600 text-sm">
                   {feedback}
                </p>
            </div>

       
    );
}
