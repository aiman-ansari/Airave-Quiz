export type QuizContextType = {
  currentQuiz: attemptQuiz;
  state: initialQuizStateType;
  dispatch: React.Dispatch<any>;
  select?: string | boolean;
  clearAllData: () => void;
  handleQuiz: (correct: string, item: string, quiz: Questions) => void;
};

//state
export type initialQuizStateType = {
  allQuizes: QuizFromFirebase[];
  selected: string;
};

//Quizes from firebase
export type QuizFromFirebase = {
  quizCategory: string;
  image: string;
  questions: Questions[];
  title: string;
};
export type Questions = {
  answer: string[];
  correctAns: string;
  questionText: string;
};

export type attemptQuiz = {
  getAttemptQuiz: Questions[];
  score: number;
  getSelectedOption: string[];
};
export type initial = {
  active: string | null;
};
export type getQuiz = {
  getQuizes: () => Promise<void>;
};
