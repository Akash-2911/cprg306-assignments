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
  const { user, loading, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/week-10");
    }
  }, [user, loading, router]);

  async function loadItems() {
    if (!user) return;

    const data = await getItems(user.uid);
    setItems(data as ItemType[]);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

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

  function cleanItemName(text: string) {
    let cleaned = text.split(",")[0];
    cleaned = cleaned.replace(/[^\w\s]/g, "");
    return cleaned.trim().toLowerCase();
  }

  function handleItemSelect(item: ItemType) {
    const ingredient = cleanItemName(item.name);
    setSelectedItemName(ingredient);
  }

  async function handleLogout() {
    await firebaseSignOut();
    router.push("/week-10");
  }

  if (loading) {
    return <main className="p-6">Loading...</main>;
  }

  if (!user) {
    return null;
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