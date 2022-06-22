import { Link } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import { useAuth } from "../../Context/AuthContext";
import "./Home.css";
export const Home = () => {
  const { quiz } = useQuiz();
  const {
    state: { isAuthenticated },
  } = useAuth();
  return (
    <div className='container'>
      <div className='bold-text'>All Categories</div>
      {quiz === undefined ? (
        <span>Loading...</span>
      ) : (
        <div className='category-container'>
          {quiz.map((item, index) => (
            <div className='category-card' key={index}>
              <img src={item.image} />
              <div>{item.title}</div>
              {isAuthenticated ? (
                <Link to={`/rules/${item.title}`}>
                  <button className='btn btn-primary mt-1'>Play Now</button>
                </Link>
              ) : (
                <Link to='/login'>
                  <button className='btn btn-primary mt-1'>Play Now</button>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
