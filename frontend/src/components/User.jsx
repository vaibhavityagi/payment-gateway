import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center font-medium mt-4">
      <div className="flex items-center grow gap-x-1">
        <div className="rounded-full bg-slate-300 w-8 h-8 text-sm flex items-center justify-center font-exo2 font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="font-exo2 font-semibold">{`${user.firstName[0].toUpperCase()}${user.firstName.substring(
          1
        )}`}</div>
      </div>
      <button
        className="transition ease-in-out bg-slate-800 px-4 py-2 text-slate-50 rounded-md text-sm font-exo2 hover:bg-green-500"
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
      >
        Send money
      </button>
    </div>
  );
}
