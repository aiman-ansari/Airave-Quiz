import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./Profile.css";
export const Profile = () => {
  const {
    state: { user, isAuthenticated },
    dispatch,
  } = useAuth();
  const logout = () => {
    localStorage.clear();
    dispatch({
      type: "logout",
    });
    toast.info("Logging out...", {
      theme: "colored",
      autoClose: 2000,
    });
  };

  return (
    <div className='profile-container'>
      {isAuthenticated ? (
        <>
          <span className='text-gray'>Welcome {user}</span>
          <button
            className='btn btn-outline-primary width-100 mt-1'
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <span className='text-gray'>Welcome </span>

          <span className='text-small'>Login to access account</span>
          <Link to='/login'>
            <button className='btn btn-outline-primary width-100 mt-1'>
              Login / Signup
            </button>
          </Link>
        </>
      )}
      <ToastContainer />
    </div>
  );
};
