import { Link } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import "./Header.css";

export const Header = () => {
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
          <img
            className='avatar avatar-xsm'
            src='https://avatarfiles.alphacoders.com/715/71560.jpg'
            alt='profile pic'
          />

          <div className='profile-content'>
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};
