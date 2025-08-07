export default function StockSection({ title, items }) {
  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}
