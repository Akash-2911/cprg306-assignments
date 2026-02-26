"use client";

import { useState } from "react";
import Item from "./item";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemType[];
};

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [view, setView] = useState<"list" | "group">("list");

  // ✅ make a copy so we never mutate props
  const itemsCopy = [...items];

  // sort copy
  itemsCopy.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.category.localeCompare(b.category);
  });

  const buttonClass = (active: boolean) =>
    `px-3 py-2 rounded font-semibold transition
     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-400
     ${active ? "bg-blue-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`;

  const groupButtonClass = (active: boolean) =>
    `px-3 py-2 rounded font-semibold transition
     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-400
     ${active ? "bg-green-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`;

  const isGroupView = view === "group";
  const isListView = view === "list";

  // GROUP VIEW
  if (isGroupView) {
    const groupedItems = itemsCopy.reduce((result: Record<string, ItemType[]>, item) => {
      const cat = item.category;
      if (!result[cat]) result[cat] = [];
      result[cat].push(item);
      return result;
    }, {});

    const categories = Object.keys(groupedItems).sort((a, b) => a.localeCompare(b));

    return (
      <div className="space-y-6">
        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className={buttonClass(isListView && sortBy === "name")}
            onClick={() => {
              setSortBy("name");
              setView("list");
            }}
          >
            Sort by Name
          </button>

          <button
            type="button"
            className={buttonClass(isListView && sortBy === "category")}
            onClick={() => {
              setSortBy("category");
              setView("list");
            }}
          >
            Sort by Category
          </button>

          <button
            type="button"
            className={groupButtonClass(true)}
            onClick={() => setView("group")}
          >
            Group by Category
          </button>
        </div>

        {/* Grouped Output (vertical items) */}
        {categories.map((cat) => {
          const catItems = [...groupedItems[cat]].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          return (
            <section key={cat} className="space-y-3">
              <h2 className="text-xl font-bold capitalize">{cat}</h2>

              <ul className="flex flex-col gap-4">
                {catItems.map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }

  // NORMAL LIST VIEW
  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          className={buttonClass(isListView && sortBy === "name")}
          onClick={() => {
            setSortBy("name");
            setView("list");
          }}
        >
          Sort by Name
        </button>

        <button
          type="button"
          className={buttonClass(isListView && sortBy === "category")}
          onClick={() => {
            setSortBy("category");
            setView("list");
          }}
        >
          Sort by Category
        </button>

        <button
          type="button"
          className={groupButtonClass(false)}
          onClick={() => setView("group")}
        >
          Group by Category
        </button>
      </div>

      {/* Items (side by side) */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {itemsCopy.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}