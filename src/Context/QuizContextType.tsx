export type QuizContextType = {
  currentQuiz: attemptQuiz;
  state: initialQuizStateType;
  dispatch: React.Dispatch<any>;
  handleQuiz: (correct: string, item: string) => void;
};

//state
export type initialQuizStateType = {
  allQuizes: QuizFromFirebase[];
};

//Quizes from firebase
export type QuizFromFirebase = {
  quizCategory: string;
  image: string;
  questions: Questions[];
  title: string;
};
type Questions = {
  answer: string[];
  correctAns: string;
  questionText: string;
};

export type attemptQuiz = {
  getAttemptQuiz: string[];
  score: number;
};
export type initial = {
  active: string | null;
};
export type getQuiz = {
  getQuizes: () => Promise<void>;
};
