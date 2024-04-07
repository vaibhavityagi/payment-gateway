import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Home from "./components/Home";
import { useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* signup logic not working */}
          <Route
            path="/signup"
            element={
              <SignUp
                isAuthenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            }
          ></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route
            path="/dashboard"
            element={
              authenticated ? <Dashboard /> : <Navigate replace to={"/"} />
            }
          ></Route>
          <Route
            path="/send"
            element={
              authenticated ? <SendMoney /> : <Navigate replace to={"/"} />
            }
          ></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
