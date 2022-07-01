import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { quizReducer } from "../Reducer/quizReducer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  QuizContextType,
  attemptQuiz,
  initialQuizStateType,
  getQuiz,
} from "./QuizContextType";

const QuizContext = createContext<QuizContextType | null>(null);

const useQuiz = () => useContext(QuizContext) as QuizContextType;

const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  //getting quizes databse
  const quizes = collection(db, "quizes");

  //getting quizes
  const getAllQuizes = () => {
    return getDocs(quizes);
  };

  useEffect(() => {
    const getQuizes: getQuiz["getQuizes"] = async () => {
      const data = await getAllQuizes();
      //storing response
      const result: any = data.docs.map((doc) => ({ ...doc.data() }));
      dispatch({
        type: "GET_QUIZS",
        payload: result,
      });
    };
    getQuizes();
  }, []);

  const [currentQuiz, setCurrentQuiz] = useState<attemptQuiz>({
    getAttemptQuiz: [],
    score: 0,
  });

  const handleQuiz = (correctOption: string, selectedOption: string) => {
    //storing all attempt question
    setCurrentQuiz((prev) => ({
      ...prev,
      getAll: [...prev.getAttemptQuiz, selectedOption],
    }));

    //checking score
    if (correctOption === selectedOption) {
      setCurrentQuiz((prev) => ({
        ...prev,
        score: prev.score + 5,
      }));
    } else {
      setCurrentQuiz((prev) => ({
        ...prev,
        score: prev.score - 3,
      }));
    }
  };

  const initialQuizState: initialQuizStateType = {
    allQuizes: [],
  };
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  return (
    <QuizContext.Provider value={{ currentQuiz, handleQuiz, state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { useQuiz, QuizProvider };
