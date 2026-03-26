"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
        <p>You must be logged in to view this page.</p>
      </main>
    );
  }

  function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
    const itemToAdd: ItemType = {
      id: crypto.randomUUID(),
      ...newItem,
    };

    setItems([...items, itemToAdd]);
  }

  function cleanItemName(text: string) {
    let cleaned = text.split(",")[0];
    cleaned = cleaned.replace(/[^\w\s]/g, "");
    cleaned = cleaned.trim().toLowerCase();
    return cleaned;
  }

  function handleItemSelect(item: ItemType) {
    const ingredient = cleanItemName(item.name);
    setSelectedItemName(ingredient);
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p className="mb-6">
        Welcome, {user.displayName} ({user.email})
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 space-y-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}