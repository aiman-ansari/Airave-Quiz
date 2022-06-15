import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Profile.css";
export const Profile = () => {
  const {
    state: { token, user, isAuthenticated },
    dispatch,
  } = useAuth();
  console.log(token, user, isAuthenticated);
  const logout = () => {
    localStorage.clear();
    dispatch({
      type: "logout",
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
    </div>
  );
};
