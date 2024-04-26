import axios from "axios";
import { useEffect, useState } from "react";
import Transation from "../components/Transaction";

export default function Transactions() {
  const [trs, setTrs] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      const data = await axios.get(
        "http://localhost:3000/api/v1/account/transactions",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log(data.data.transactions);
      setTrs(data.data.transactions);
    };
    getHistory();
  }, []);

  return (
    <div>
      {trs.map((tr, idx) => (
        <Transation key={idx} tr={tr} />
      ))}
    </div>
  );
}
