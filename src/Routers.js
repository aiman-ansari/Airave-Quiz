import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";

export const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  );
};
