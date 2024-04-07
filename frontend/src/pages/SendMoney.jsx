import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SendMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  async function transferMoney() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: id,
        amount,
      },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    navigate("/dashboard");
  }
  return (
    <>
      <div className="flex justify-center h-dvh bg-slate-100">
        <div className="shadow-lg m-auto border-black-50 border border-solid rounded p-5 bg-slate-50">
          <h2 className="text-lg font-bold text-center mb-9">Send Money</h2>
          <div className="flex w-64 h-auto gap-x-2 items-center">
            <span className="rounded-full bg-green-500 text-white w-8 h-8 text-sm flex items-center justify-center">
              {name[0].toUpperCase()}
            </span>
            <h3 className="font-semibold text-md">{`${name[0].toUpperCase()}${name.substring(
              1
            )}`}</h3>
          </div>
          <div className="font-medium text-xs mb-2">Amount (in Rs)</div>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            min={0}
            className="border w-full rounded text-xs p-2 mb-3"
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <button
            className="w-full bg-green-500 rounded text-white text-xs p-2 font-medium mb-1"
            onClick={transferMoney}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </>
  );
}
