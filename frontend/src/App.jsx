import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Home from "./components/Home";
import { useState } from "react";
import Redirect from "./pages/Redirect";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route
            path="/signup"
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          ></Route>

          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate replace to={"/"} />}
          ></Route>
          <Route
            path="/send"
            element={isLoggedIn ? <SendMoney /> : <Navigate replace to={"/"} />}
          ></Route>
          <Route
            path="/transactions"
            element={
              isLoggedIn ? (
                <Redirect type="transactions" />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          ></Route>
          <Route
            path="/friends"
            element={
              isLoggedIn ? (
                <Redirect type="friends" />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          ></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
