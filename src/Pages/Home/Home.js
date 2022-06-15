import { Alert } from "../../Components/Alert/Alert";
import { useAuth } from "../../Context/AuthContext";
import { useQuiz } from "../../Context/QuizContext";
import "./Home.css";
export const Home = () => {
  const { quiz } = useQuiz();

  return (
    <div className='container'>
      {/* <Alert /> */}
      <div className='bold-text'>All Categories</div>
      {quiz === undefined ? (
        <span>Loading...</span>
      ) : (
        <div className='category-container'>
          {quiz.map((item) => (
            <div className='category-card'>
              <img src={item.image} />
              <div>{item.title}</div>
              <button className='btn btn-primary mt-1'>Play Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
