import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Authentication/Login";
import { SignUp } from "./Pages/Authentication/Signup";
import { Home } from "./Pages/Home/Home";
import { QuizPage } from "./Pages/QuizPage/QuizPage";
import { Result } from "./Pages/Result/Result";
import { Rules } from "./Pages/Rules/Rules";

export const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/:id' element={<QuizPage />}></Route>
      <Route path='/rules/:id' element={<Rules />}></Route>
      <Route path='/result' element={<Result />}></Route>
    </Routes>
  );
};
