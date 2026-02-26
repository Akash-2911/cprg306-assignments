"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
    const itemToAdd: ItemType = {
      id: crypto.randomUUID(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
    };

    setItems([...items, itemToAdd]);
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shopping List</h1>

      <NewItem onAddItem={handleAddItem} />

      <ItemList items={items} />
    </main>
  );
}