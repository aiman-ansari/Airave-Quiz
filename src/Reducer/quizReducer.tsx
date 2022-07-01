import {
  initialQuizStateType,
  QuizFromFirebase,
} from "../Context/QuizContextType";

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

    default:
      return state;
  }
}

// export const quizReducer = (state: string[], action: Action) => {
//   switch (action.type) {
//     case "CHECKED":
//       return {
//         ...state,
//         active: action.payload,
//       };

//     default:
//       break;
//   }
// };
