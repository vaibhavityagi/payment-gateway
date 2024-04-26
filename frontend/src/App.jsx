import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Home from "./components/Home";
import { useState } from "react";
import Transactions from "./pages/Transactions";
import Friends from "./pages/Friends";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* signup logic not working */}
          <Route
            path="/signup"
            element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate replace to={"/"} />
            }
          ></Route>
          <Route
            path="/send"
            element={
              isAuthenticated ? <SendMoney /> : <Navigate replace to={"/"} />
            }
          ></Route>
          <Route
            path="/transactions"
            element={
              isAuthenticated ? <Transactions /> : <Navigate replace to={"/"} />
            }
          ></Route>
          <Route
            path="/friends"
            element={
              isAuthenticated ? <Friends /> : <Navigate replace to={"/"} />
            }
          ></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
