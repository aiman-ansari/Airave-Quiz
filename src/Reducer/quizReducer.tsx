import {
  initialQuizStateType,
  QuizFromFirebase,
} from "../Context/Types/QuizContextType";

type Action =
  | {
      type: "CHECKED";
      payload: string;
    }
  | {
      type: "GET_QUIZS";
      payload: QuizFromFirebase[];
    };
export function quizReducer(
  state: initialQuizStateType,
  action: Action
): initialQuizStateType {
  switch (action.type) {
    case "GET_QUIZS":
      return {
        ...state,
        allQuizes: action.payload,
      };
    case "CHECKED":
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
}
