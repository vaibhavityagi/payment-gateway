import Appbar from "../components/Appbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-32 my-10">
        <div>
          <Appbar></Appbar>

          <div className="mx-3 mt-10">
            <Balance></Balance>
            <div className="flex gap-5">
              <Button
                label="Other Users"
                onClick={() => navigate("/friends")}
              />
              <Button
                label="Transation History"
                onClick={() => navigate("/transactions")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
