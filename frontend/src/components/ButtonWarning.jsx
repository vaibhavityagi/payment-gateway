import { Link } from "react-router-dom";

export default function ButtonWarning({ label, buttonText, to }) {
  return (
    <>
      <div className="flex justify-center text-sm py-1 gap-x-1">
        <div>{label}</div>
        <Link to={to} className=" underline cursor-pointer ">
          {buttonText}
        </Link>
      </div>
    </>
  );
}
