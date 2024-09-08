import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonWarning from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signinUser() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        email,
        password,
      }
    );

    setIsLoggedIn(true);
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    navigate("/dashboard");
  }
  return (
    <>
      <div className="flex justify-center h-dvh bg-slate-300">
        <div className="w-80 rounded-lg border bg-white p-3 m-auto h-max">
          <Heading label="Sign In"></Heading>
          <SubHeading label="Enter your credentials to access your account"></SubHeading>
          <InputBox
            type="email"
            placeholder="janedoe@gmail.com"
            label="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputBox>
          <InputBox
            type="password"
            label="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputBox>
          <Button label="Sign In" onClick={signinUser}></Button>
          <ButtonWarning
            label="Don't have an account?"
            to="/signup"
            buttonText="Sign Up"
          />
        </div>
      </div>
    </>
  );
}
