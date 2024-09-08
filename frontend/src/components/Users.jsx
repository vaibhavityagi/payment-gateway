import { Suspense, useEffect, useState, lazy } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import Pagination from "./Pagination";
import User from "../components/User";

export default function Users() {
  // users is initially an empty array
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const debouncedValue = useDebounce(filter, 500);

  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get(
        `https://payment-gateway-api.vercel.app/api/v1/user/bulk?filter=${debouncedValue}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const me = await axios.get(
        "https://payment-gateway-api.vercel.app/api/v1/user/me",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      const filteredUsers = result.data.users.filter(
        (user) => user._id != me.data.user._id
      );
      setUsers(filteredUsers);
    };
    getUsers();
  }, [debouncedValue]);

  // for pagination
  const [currPage, setCurrPage] = useState(1);
  const [usersPerPage] = useState(5);

  const indexOfLastUser = currPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // change page
  const paginate = (number) => setCurrPage(number);

  return (
    <div>
      <h2 className="font-bold text-lg my-1">Users</h2>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search users..."
        className="border w-full p-1 rounded"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />

      {currentUsers.map((user, idx) => (
        <User user={user} key={idx}></User>
      ))}

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      ></Pagination>
    </div>
  );
}
