import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

export default function Pagination({ usersPerPage, totalUsers, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="flex gap-1 mt-14 justify-center items-center">
        {/* <GoTriangleLeft /> */}
        <div>
          {pageNumbers.map((number) => {
            return (
              <span
                onClick={() => paginate(number)}
                key={number}
                className="p-1 rounded px-2 cursor-pointer mr-1 text-slate-500 hover:border hover:text-slate-600"
              >
                {number}
              </span>
            );
          })}
        </div>
        {/* <GoTriangleRight /> */}
      </div>
    </>
  );
}
