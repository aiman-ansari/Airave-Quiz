import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";
import { Questions, QuizFromFirebase } from "../../Context/QuizContextType";
import "./QuizPage.css";
export const QuizPage = () => {
  const { handleQuiz, state, dispatch, select } = useQuiz();
  const navigate = useNavigate();
  const { allQuizes, selected } = state;
  const [currentQuizCount, setCurrentQuizCount] = useState(0);
  const [timer, setTimer] = useState(10);
  const { id } = useParams();
  const QuizById = allQuizes.filter(
    (item: QuizFromFirebase) => item.title === id
  );
  // type selectedOptionType = {
  //   select: string,
  //   setSelect : React.SetStateAction<string> => void
  // }
  // const [select, setSelect] = useState<string | boolean>();
  const handleChecked = (option: string, answer: string[]) => {
    if (
      select === option &&
      select === QuizById[0].questions[currentQuizCount].correctAns
    ) {
      return "selected";
    } else if (
      select === option &&
      select !== QuizById[0].questions[currentQuizCount].correctAns
    ) {
      return "wrong";
    }
  };
  useEffect(() => {
    settingTimer();
  });
  const settingTimer = () => {
    const nextQuestion = currentQuizCount + 1;

    // const time = setTimeout(() => {
    //   setTimer(timer - 1);
    // }, 1000);

    // if (timer === 0) {
    //   setTimer(0);

    //   if (nextQuestion < QuizById[0].questions.length) {
    //     setCurrentQuizCount(nextQuestion);
    //     setTimer(10);
    //   } else {
    //     navigate("/result");
    //   }
    // }
    // return () => {
    //   clearInterval(time);
    // };
  };

  const handleQuizs = (
    correctOption: string,
    selectedOption: string,
    quiz: Questions
  ) => {
    handleQuiz(correctOption, selectedOption, quiz);
    const nextQuestion = currentQuizCount + 1;

    setTimeout(() => {
      if (nextQuestion < QuizById[0].questions.length) {
        setCurrentQuizCount(nextQuestion);
      } else {
        navigate("/result");
      }
    }, 2000);
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
                className={`button-answer width-100 ${
                  select &&
                  handleChecked(
                    item,
                    QuizById[0].questions[currentQuizCount].answer
                  )
                }`}
                onClick={() => {
                  handleQuizs(
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
