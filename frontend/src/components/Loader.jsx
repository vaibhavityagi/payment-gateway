import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loader() {
  return (
    <>
      {/* <div className="border bg-gray-200 w-full h-10 mb-2 mt-5"></div>
      <div className="border bg-gray-200 w-full h-10 mb-3"></div>
      <div className="flex items-center grow gap-x-1">
        <div className="rounded-full bg-slate-200 w-8 h-8 text-sm flex items-center justify-center"></div>
        <div className="border bg-gray-200 w-full h-10 mb-2"></div>
      </div>
      <div className="flex items-center grow gap-x-1">
        <div className="rounded-full bg-slate-100 w-8 h-8 text-sm flex items-center justify-center"></div>
        <div className="border bg-gray-100 w-full h-10 mb-2"></div>
      </div>
      <div className="flex items-center grow gap-x-1">
        <div className="rounded-full bg-slate-100 w-8 h-8 text-sm flex items-center justify-center"></div>
        <div className="border bg-gray-100 w-full h-10 mb-2"></div>
      </div> */}
      <div>
        <Skeleton />
        <Skeleton count={5} />
      </div>
    </>
  );
}
