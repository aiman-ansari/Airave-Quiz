import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import "./Auth.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  type testUser = {
    email: string;
    password: string;
  };
  const test: testUser = {
    email: "test@gmail.com",
    password: "test1234",
  };

  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      if (user.email === test.email) {
        updateProfile(user, {
          displayName: "test",
        });
      }
    }
  });
  const handleSubmit = async () => {
    if (email && password) {
      setError(false);
      try {
        await handleLogin(email, password);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err: any) {
        setError(true);
        setMessage(err.message);
      }
    } else {
      setError(true);
      setMessage("Please fill all the fields");
    }
  };
  const handleTest = () => {
    setEmail(test.email);
    setPassword(test.password);
  };
  return (
    <div className='auth-container'>
      <div className='form'>
        <span className='bold-text'>Login</span>
        <div className='input-with-icons '>
          <i className='bi bi-envelope-fill input-icon'></i>
          <input
            type='email'
            placeholder='Enter your Email'
            className='icon-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-with-icons '>
          <i className='bi bi-lock-fill input-icon'></i>
          <input
            type='password'
            placeholder='Enter your Password'
            className='icon-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error === true && (
          <div className='alert alert-danger mb-1'>{message}</div>
        )}

        <div className='btn-container'>
          <button
            className='btn btn-outline-primary  width-100'
            onClick={() => handleSubmit()}
          >
            Login
          </button>
          <button
            className='btn btn-outline-primary'
            onClick={() => handleTest()}
          >
            Test Login
          </button>
          <div className='link-primary' onClick={() => navigate("/signup")}>
            New user? Create account
          </div>
        </div>
      </div>
      <div className='login-image'>
        <img src='/svg/Mobile login-pana.svg' />
      </div>
      <ToastContainer />
    </div>
  );
};
