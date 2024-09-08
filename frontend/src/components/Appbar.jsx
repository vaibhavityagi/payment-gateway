import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const currUserInfo = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUserInfo(response.data.user);
    };
    currUserInfo();
  }, []);

  return (
    <div>
      <div className="border-t-4 border-black"></div>
      <div className="flex border-b gap-x-2 font-medium p-2">
        <div
          className="grow font-oxygen font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          PayTm
        </div>
        <div className="rounded-full bg-slate-300 w-7 h-7 text-sm flex items-center justify-center font-oxygen">
          {userInfo.firstName}
        </div>
        <div
          className="cursor-pointer font-oxygen font-bold"
          onClick={() => {
            // add a are you sure screen?
            navigate("/signin");
            localStorage.clear();
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
