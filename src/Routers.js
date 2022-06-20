import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Authentication/Login";
import { SignUp } from "./Pages/Authentication/Signup";
import { Home } from "./Pages/Home/Home";

export const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
    </Routes>
  );
};
