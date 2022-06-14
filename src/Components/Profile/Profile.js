import { Link } from "react-router-dom";
import "./Profile.css";
export const Profile = () => {
  return (
    <div className='profile-container'>
      <span className='text-gray'>Welcome</span>
      <span className='text-small'>Login to access account</span>

      <Link to='/login'>
        <button className='btn btn-outline-primary width-100 mt-1'>
          Login / Signup
        </button>
      </Link>
    </div>
  );
};
