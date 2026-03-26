"use client";

import { useEffect, useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { getItems, addItem } from "../_services/shopping-list-service";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // 🔹 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    }
  }, [user, router]);

  // 🔹 Load items from Firestore
  async function loadItems() {
    if (!user) return;

    const data = await getItems(user.uid);
    setItems(data as ItemType[]);
  }

  // 🔹 Run when user loads
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  // 🔹 Add item to Firestore
  async function handleAddItem(newItem: {
    name: string;
    quantity: number;
    category: string;
  }) {
    if (!user) return;

    const id = await addItem(user.uid, newItem);

    const itemToAdd: ItemType = {
      id,
      ...newItem,
    };

    setItems([...items, itemToAdd]);
  }

  // 🔹 Clean name for API
  function cleanItemName(text: string) {
    let cleaned = text.split(",")[0];
    cleaned = cleaned.replace(/[^\w\s]/g, "");
    return cleaned.trim().toLowerCase();
  }

  // 🔹 Select item → meal ideas
  function handleItemSelect(item: ItemType) {
    const ingredient = cleanItemName(item.name);
    setSelectedItemName(ingredient);
  }

  // 🔹 Logout + redirect
  async function handleLogout() {
    await firebaseSignOut();
    router.push("/week-10");
  }

  // 🔹 Prevent UI flash
  if (!user) return null;

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <p className="mb-6">
        Welcome, {user.displayName} ({user.email})
      </p>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left */}
        <div className="md:w-1/2 space-y-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Right */}
        <div className="md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}