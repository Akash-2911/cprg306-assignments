"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || name.length < 2) {
      alert("Name must be at least 2 characters.");
      return;
    }

    const item = {
      name: name,
      quantity: quantity,
      category: category,
    };

    console.log(item);

    alert(`Item Added:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  }

  const nameHasError = nameTouched && (!name || name.length < 2);
  const isFormInvalid = !name || name.length < 2;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white text-black p-4 rounded shadow space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          onFocus={() => setNameTouched(false)}
          className={`w-full border rounded p-2 outline-none ${
            nameHasError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g. Apples"
        />
        {nameHasError && (
          <p className="text-red-500 text-sm mt-1">
            Name must be at least 2 characters.
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block font-semibold mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          required
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border border-gray-300 rounded p-2 outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 outline-none"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isFormInvalid}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </form>
  );
}
