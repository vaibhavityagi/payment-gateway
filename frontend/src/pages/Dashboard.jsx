import { Suspense } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard() {
  return (
    <>
      <div className="mx-32 my-10">
        <div>
          <Appbar></Appbar>

          <div className="ml-4">
            {/* <Suspense fallback={"loading..."}> */}
            <Balance></Balance>
            <Users></Users>
            {/* </Suspense> */}
          </div>
        </div>
      </div>
    </>
  );
}
