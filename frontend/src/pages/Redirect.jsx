import Appbar from "../components/Appbar";
import Users from "../components/Users";
import Transactions from "./Transactions";

export default function Redirect({ type }) {
  return (
    <>
      <div className="mx-32 my-10">
        <div className="ml-4">
          <Appbar />
          <div className="mx-3">
            {type == "friends" ? <Users></Users> : <Transactions />}
          </div>
        </div>
      </div>
    </>
  );
}
