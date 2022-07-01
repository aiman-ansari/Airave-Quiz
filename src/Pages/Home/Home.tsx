import { Link } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import { useAuth } from "../../Context/AuthContext";
import { QuizFromFirebase } from "../../Context/QuizContextType";
import "./Home.css";
export const Home = () => {
  const { state } = useQuiz();
  const { allQuizes } = state;
  const {
    state: { isAuthenticated },
  } = useAuth();
  return (
    <div className='container'>
      <div className='bold-text'>All Categories</div>
      {allQuizes ? (
        <div className='category-container'>
          {allQuizes?.map((item: QuizFromFirebase) => (
            <div className='category-card' key={item.title}>
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
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
