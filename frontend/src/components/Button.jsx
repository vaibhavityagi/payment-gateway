export default function Button({ label, onClick }) {
  return (
    <button
      className="bg-black text-white rounded-md p-2 w-full my-4 "
      onClick={onClick}
    >
      {label}
    </button>
  );
}
