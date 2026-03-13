"use client";

import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) return [];

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  const data = await response.json();
  return data.meals ? data.meals : [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    const results = await fetchMealIdeas(ingredient);
    setMeals(results);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-4 border border-gray-600 rounded">
      <h2 className="text-xl font-bold mb-3">
        Meal Ideas {ingredient ? `for "${ingredient}"` : ""}
      </h2>

      {!ingredient && <p className="text-gray-300">Click an item to see meal ideas.</p>}

      {ingredient && meals.length === 0 && (
        <p className="text-gray-300">No meals found for this ingredient.</p>
      )}

      <ul className="space-y-2">
        {meals.map((meal) => (
          <li key={meal.idMeal} className="border border-gray-700 p-2 rounded">
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}