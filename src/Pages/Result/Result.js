import { useQuiz } from "../../Context/QuizContext";
import { Link } from "react-router-dom";
import "./Result.css";
export const Result = () => {
  const {
    currentQuiz: { getSelectedAnswer, getQuiz, score },
    state,
  } = useQuiz();
  const handleCheck = (option, quiz) => {
    if (option === quiz.correctAns) {
      return "correct";
    }
    if (getSelectedAnswer.find((item) => item === option)) {
      return "wrong";
    }
  };

  return (
    <div className='result-container'>
      {getSelectedAnswer.length > 0 ? (
        <>
          <div className='bold-text'>Result page</div>
          <h4 className='text-primary'>
            Score :<span className='text-dark'>{score}/25</span>
          </h4>
          <Link to='/'>
            <button className='btn btn-outline-primary'>Play Again</button>
          </Link>
          {getQuiz.map((quiz) => (
            <div className='quiz-container' key={quiz}>
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
        <h4>Go back to home page</h4>
      )}
    </div>
  );
};
