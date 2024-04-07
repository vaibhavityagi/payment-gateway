import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
  const [bal, setBal] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setBal(response.data.balance);
    };
    getBalance();
  }, []);

  return <div className="font-bold my-2 text-lg">Your balance Rs {bal}</div>;
}
