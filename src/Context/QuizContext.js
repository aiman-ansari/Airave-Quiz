import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { quizReducer } from "../Reducer/quizReducer";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
const QuizContext = createContext();

const useQuiz = () => useContext(QuizContext);
const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);
  const quizes = collection(db, "quizes");

  useEffect(() => {
    getQuizes();
  }, []);
  const [currentQuiz, setCurrentQuiz] = useState({
    getAll: [],
    score: 0,
  });
  const getAllQuizes = () => {
    return getDocs(quizes);
  };
  const handleQuiz = (correct, item) => {
    setCurrentQuiz((prev) => ({
      ...prev,
      getAll: [...prev.getAll, item],
    }));

    if (correct === item) {
      setCurrentQuiz((prev) => ({
        ...prev,
        score: prev.score + 5,
      }));
    }
  };
  const getQuizes = async () => {
    const data = await getAllQuizes();
    setQuiz(data.docs.map((doc) => ({ ...doc.data() })));
  };
  const [state, dispatch] = useReducer(quizReducer, {
    active: "",
  });
  console.log(currentQuiz);
  return (
    <QuizContext.Provider
      value={{ quiz, currentQuiz, handleQuiz, state, dispatch }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { useQuiz, QuizProvider };
