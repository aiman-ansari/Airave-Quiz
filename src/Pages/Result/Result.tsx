import { useQuiz } from "../../Context/QuizContext";
import { Link } from "react-router-dom";
import "./Result.css";
import { Questions } from "../../Context/QuizContextType";
export const Result = () => {
  const { currentQuiz } = useQuiz();
  const { getAttemptQuiz, score, getSelectedOption } = currentQuiz;

  const handleCheck = (option: string, quiz: Questions) => {
    if (option === quiz.correctAns) {
      return "correct";
    }
    if (getSelectedOption.find((item) => item === option)) {
      return "wrong";
    }
  };
  return (
    <div className='result-container'>
      {getAttemptQuiz.length > 0 ? (
        <>
          <div className='bold-text'>Result page</div>
          <h4 className='text-primary'>
            Score :<span className='text-dark'>{score}/25</span>
          </h4>
          <Link to='/'>
            <button className='btn btn-outline-primary'>Play Again</button>
          </Link>
          {getAttemptQuiz?.map((quiz) => (
            <div className='quiz-container' key={quiz.questionText}>
              <div className='text-gray'>{quiz.questionText}</div>
              <div className='answer-container'>
                {quiz.answer.map((option) => (
                  <div key={option}>
                    <button
                      className={`button-answer ${handleCheck(option, quiz)}`}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <Link to='/'>
          <button className='btn btn-outline-primary w-100'>
            Back To Home
          </button>
        </Link>
      )}
    </div>
  );
};
