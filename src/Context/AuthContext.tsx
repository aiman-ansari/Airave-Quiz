import { createContext, useContext, useReducer } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authReducer } from "../Reducer/authReducer";
import { initialStateType } from "./initialStateType";

const initialState: initialStateType = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
};

const AuthContext = createContext<any>({} as any);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  const handleSingup = async (
    email: string,
    password: any,
    username: string
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(res.user, {
      displayName: username,
    });
    dispatch({
      type: "signup",
      payload: res.user,
    });
    localStorage.setItem("token", res.user.uid);
  };

  const handleLogin = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", res.user.uid);
    localStorage.setItem("user", res.user.displayName ?? "");
    dispatch({
      type: "login",
      payload: res.user,
    });
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{ handleSingup, handleLogin, state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { useAuth, AuthProvider };
