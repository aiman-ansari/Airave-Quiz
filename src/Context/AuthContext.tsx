import React, { createContext, useContext, useReducer } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Action, authReducer } from "../Reducer/authReducer";
import { initialStateType } from "../Context/Types/AuthContextType";

const initialState: initialStateType = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
};
type authContextType = {
  handleSingup: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  state: initialStateType;

  dispatch: React.Dispatch<Action>;
};
const AuthContext = createContext<authContextType | null>(null);
const useAuth = () => useContext(AuthContext) as authContextType;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const handleSingup = async (
    email: string,
    password: string,
    username: string
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(res.user, {
      displayName: username,
    });
    dispatch({
      type: "signup",
      payload: {
        token: res.user.uid,
        user: res.user.displayName,
      },
    });
    localStorage.setItem("token", res.user.uid);
  };

  const handleLogin = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", res.user.uid);
    localStorage.setItem("user", res.user.displayName ?? "");
    dispatch({
      type: "login",
      payload: {
        token: res.user.uid,
        user: res.user.displayName,
        isAuthenticated: false,
      },
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
