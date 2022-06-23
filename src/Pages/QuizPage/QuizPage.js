import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import "./QuizPage.css";
export const QuizPage = () => {
  const { quiz, handleQuiz, state, dispatch, currentQuiz } = useQuiz();
  const [currentQuizCount, setCurrentQuizCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const { id } = useParams();
  const QuizById = quiz.filter((item) => item.title === id);
  const navigate = useNavigate();
  const handleChecked = (item) => {
    if (item === state.active) {
      return "selected";
    }
  };
  useEffect(() => {
    settingTimer();
  });
  const settingTimer = () => {
    const nextQuestion = currentQuizCount + 1;

    const time = setTimeout(() => {
      setTimer(timer - 1);
      if (timer === 0) {
        if (nextQuestion < QuizById[0].questions.length) {
          setCurrentQuizCount(nextQuestion);
          setTimer(10);
        } else {
          navigate("/result");
        }
      }
    }, 1000);
    return () => {
      clearInterval(time);
    };
  };

  return (
    <>
      {QuizById !== undefined && QuizById.length > 0 ? (
        <div className='quiz-container'>
          <div className='bold-text flex-align-center'>{QuizById[0].title}</div>
          <div className='quiz-header'>
            <span className='text-primary'>
              Question:
              <span className='text-dark'>{currentQuizCount + 1}/5</span>
            </span>
            <span className='text-primary'>
              Timer:
              <span className='text-dark'>{timer}sec</span>
            </span>
          </div>
          <div className='text-question'>
            {QuizById[0].questions[currentQuizCount].questionText}
          </div>
          <div className='ans-container'>
            {QuizById[0].questions[currentQuizCount].answer.map((item) => (
              <button
                key={item}
                className={`button-answer width-100 ${handleChecked(item)}`}
                onClick={() => {
                  handleQuiz(
                    QuizById[0].questions[currentQuizCount].correctAns,
                    item,
                    QuizById[0].questions[currentQuizCount]
                  );
                  dispatch({
                    type: "CHECKED",
                    payload: item,
                  });
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <h4>Loading....</h4>
      )}
    </>
  );
};
