import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Profile } from "../Profile/Profile";
import "./Header.css";

export const Header = () => {
  const {
    state: { isAuthenticated, user },
  } = useAuth();
  return (
    <nav>
      <ul>
        <Link to='/'>
          <li className='nav-text mr-2 text-accent'>Airave Quiz</li>
        </Link>
      </ul>
      <div>
        <input type='text' placeholder='Search here' className='search-input' />
      </div>

      <div>
        <div className='profile'>
          {isAuthenticated ? (
            <div className='avatar avatar-xsm avatar-green flex-align-center'>
              {user?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <i className='bi bi-person-fill'></i>
          )}

          <div className='profile-content'>
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};
