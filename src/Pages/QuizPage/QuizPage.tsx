import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import { Questions, QuizFromFirebase } from "../../Context/QuizContextType";
import "./QuizPage.css";
export const QuizPage = () => {
  const { handleQuiz, state, dispatch, select } = useQuiz();
  const navigate = useNavigate();
  const { allQuizes } = state;
  const [currentQuizCount, setCurrentQuizCount] = useState(0);
  const { id } = useParams();
  const SelectedQuizCategory = allQuizes.filter(
    (item: QuizFromFirebase) => item.title === id
  );
  const handleChecked = (option: string) => {
    if (select === option) {
      return "selected";
    }
  };

  const handleQuizs = (
    correctOption: string,
    selectedOption: string,
    quiz: Questions
  ) => {
    handleQuiz(correctOption, selectedOption, quiz);
    const nextQuestion = currentQuizCount + 1;

    setTimeout(() => {
      if (nextQuestion < SelectedQuizCategory[0].questions.length) {
        setCurrentQuizCount(nextQuestion);
      } else {
        navigate("/result");
      }
    }, 2000);
  };
  return (
    <>
      {SelectedQuizCategory !== undefined && SelectedQuizCategory.length > 0 ? (
        <div className='quiz-container'>
          <div className='bold-text flex-align-center'>
            {SelectedQuizCategory[0].title}
          </div>
          <div className='quiz-header'>
            <span className='text-primary'>
              Question:
              <span className='text-dark'>{currentQuizCount + 1}/5</span>
            </span>
          </div>
          <div className='text-question'>
            {SelectedQuizCategory[0].questions[currentQuizCount].questionText}
          </div>
          <div className='ans-container'>
            {SelectedQuizCategory[0].questions[currentQuizCount].answer.map(
              (item) => (
                <button
                  key={item}
                  className={`button-answer width-100
                 ${select && handleChecked(item)}`}
                  onClick={() => {
                    handleQuizs(
                      SelectedQuizCategory[0].questions[currentQuizCount]
                        .correctAns,
                      item,
                      SelectedQuizCategory[0].questions[currentQuizCount]
                    );
                    dispatch({
                      type: "CHECKED",
                      payload: item,
                    });
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <h4>Loading....</h4>
      )}
    </>
  );
};
