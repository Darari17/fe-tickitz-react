export const SeatInput = ({ id, name, selectedSeats = [], onChange }) => {
  const isSelected = selectedSeats.includes(name);
  const bgColor = isSelected ? "bg-blue-600" : "bg-gray-300";

  return (
    <div
      className={`w-6 h-6 md:w-8 md:h-8 rounded cursor-pointer flex items-center justify-center ${bgColor}`}
    >
      <label
        htmlFor={id}
        className="block w-full h-full rounded cursor-pointer"
      ></label>
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={onChange}
        checked={isSelected}
        className="hidden"
      />
    </div>
  );
};
