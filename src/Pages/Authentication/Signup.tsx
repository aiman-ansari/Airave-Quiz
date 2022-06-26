import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSingup } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (firstName && email && password) {
      if (password.length > 6) {
        setError(false);
        try {
          await handleSingup(email, password, firstName);
          navigate("/login");
        } catch (err: any) {
          setError(true);
          setMessage(err.message);
        }
      } else {
        setError(true);
        setMessage("Password should be greater than 6 character");
      }
    } else {
      setError(true);
      setMessage("Please fill all the fields");
    }
  };

  return (
    <div className='auth-container'>
      <div className='form'>
        <span className='bold-text'>Sign up</span>
        <div className='input-with-icons '>
          <i className='bi bi-person-fill input-icon'></i>
          <input
            type='text'
            placeholder='Enter your name'
            className='icon-input'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
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
            Signup
          </button>
          <div className='link-primary' onClick={() => navigate("/login")}>
            Already have an account ?
          </div>
        </div>
      </div>
      <div className='login-image'>
        <img src='/svg/Mobile login-cuate.svg' />
      </div>
    </div>
  );
};
