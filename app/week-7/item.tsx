type ItemProps = {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void;
};

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      className="border border-gray-500 p-4 rounded w-full h-full cursor-pointer hover:bg-gray-800"
    >
      <p className="font-semibold">{name}</p>
      <p>Quantity: {quantity}</p>
      <p className="capitalize">Category: {category}</p>
    </li>
  );
}