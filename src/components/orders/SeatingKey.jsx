export const SeatingKey = () => {
  const keys = [
    { color: "bg-gray-100 border border-gray-300", label: "Available" },
    { color: "bg-blue-600", label: "Selected" },
    { color: "bg-pink-400", label: "Love nest" },
    { color: "bg-gray-600", label: "Sold" },
  ];

  return (
    <div className="px-6 lg:px-12 py-10 flex flex-col items-center lg:justify-center gap-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Seating key</h3>

      <div className="flex flex-wrap justify-center gap-6">
        {keys.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${item.color}`}></div>
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
