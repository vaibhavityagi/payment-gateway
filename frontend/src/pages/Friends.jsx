import { Suspense, lazy } from "react";
import Appbar from "../components/Appbar";
import Loader from "../components/Loader";
const Users = lazy(() => import("../components/Users"));

export default function Friends() {
  return (
    <>
      <div className="mx-32 my-10">
        <div className="ml-4">
          <Appbar />
          <div className="mx-3">
            <Suspense fallback={<Loader />}>
              <Users></Users>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
