import { createContext, useContext, useReducer } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authReducer } from "../Reducer/authReducer";
import { Alert } from "../Components/Alert/Alert";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
};

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const handleSingup = async (email, password, username) => {
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

  const handleLogin = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", res.user.uid);
    localStorage.setItem("user", res.user.displayName);
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
