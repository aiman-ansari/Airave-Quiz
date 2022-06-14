import { createContext, useContext, useState, useEffect } from "react";
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

  const getAllQuizes = () => {
    return getDocs(quizes);
  };

  const getQuizes = async () => {
    const data = await getAllQuizes();
    setQuiz(data.docs.map((doc) => ({ ...doc.data() })));
  };
  console.log(quiz);
  return (
    <QuizContext.Provider value={{ quiz }}>{children}</QuizContext.Provider>
  );
};

export { useQuiz, QuizProvider };
