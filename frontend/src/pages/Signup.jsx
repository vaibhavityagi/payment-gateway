import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonWarning from "../components/ButtonWarning";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup({ setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function createUser() {
    const response = await axios.post(
      "https://payment-gateway-api.vercel.app/api/v1/user/signup",
      {
        firstName,
        lastName,
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
          <Heading label="Sign Up"></Heading>
          <SubHeading label="Enter your information to create an account"></SubHeading>
          <InputBox
            type="text"
            placeholder="Jane"
            label="First Name"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          ></InputBox>
          <InputBox
            type="text"
            placeholder="Doe"
            label="Last Name"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          ></InputBox>
          <InputBox
            type="email"
            placeholder="janedoe@gmail.com"
            label="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputBox>
          <InputBox
            type="password"
            placeholder="12345"
            label="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputBox>
          <Button label="Sign Up" onClick={createUser}></Button>
          <ButtonWarning
            label="Already have an account?"
            to="/signin"
            buttonText="Sign In"
          />
        </div>
      </div>
    </>
  );
}
