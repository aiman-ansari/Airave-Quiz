import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { quizReducer } from "../Reducer/quizReducer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const QuizContext = createContext();

const useQuiz = () => useContext(QuizContext);
const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);
  const quizes = collection(db, "quizes");

  useEffect(() => {
    getQuizes();
  }, []);
  const initialState = {
    getSelectedAnswer: [],
    getQuiz: [],
    score: 0,
    active: "",
  };
  const [currentQuiz, setCurrentQuiz] = useState(initialState);
  const getAllQuizes = () => {
    return getDocs(quizes);
  };
  const handleQuiz = (correct, item, quiz) => {
    setCurrentQuiz((prev) => ({
      ...prev,
      getQuiz: [...prev.getQuiz, quiz],
      getSelectedAnswer: [...prev.getSelectedAnswer, item],
    }));
    if (correct === item) {
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
  const getQuizes = async () => {
    const data = await getAllQuizes();
    setQuiz(data.docs.map((doc) => ({ ...doc.data() })));
  };
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider
      value={{ quiz, currentQuiz, handleQuiz, state, dispatch, setCurrentQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { useQuiz, QuizProvider };
