import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
  const [bal, setBal] = useState();

  useEffect(() => {
    const getBalance = async () => {
      const response = await axios.get(
        "https://payment-gateway-api.vercel.app/api/v1/account/balance",
        {
          headers: { Authorization: localStorage.getItem("token") },
          withCredentials: true,
        }
      );
      setBal(response.data.balance);
    };
    getBalance();
  }, []);

  return <div className="font-bold my-2 text-3xl">Balance: Rs {bal}</div>;
}
