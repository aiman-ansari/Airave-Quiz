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
  QuizFromFirebase,
  Questions,
} from "./QuizContextType";
import { stat } from "fs";

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
  const [select, setSelect] = useState<string | boolean>();
  const [currentQuiz, setCurrentQuiz] = useState<attemptQuiz>({
    getSelectedOption: [],
    score: 0,
    getAttemptQuiz: [],
  });

  const handleQuiz = (
    correctOption: string,
    selectedOption: string,
    quiz: Questions
  ) => {
    //storing all attempt question
    setCurrentQuiz((prev) => ({
      ...prev,
      getSelectedOption: [...prev.getSelectedOption, selectedOption],
      getAttemptQuiz: [...prev.getAttemptQuiz, quiz],
    }));
    setSelect(selectedOption);

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
    selected: "",
  };
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);
  console.log(state);
  return (
    <QuizContext.Provider
      value={{ currentQuiz, handleQuiz, state, dispatch, select }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { useQuiz, QuizProvider };
