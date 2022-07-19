import { initialStateType } from "../Context/Types/AuthContextType";

export type Action =
  | {
      type: "signup";
      payload: {
        token: string;
        user: string | null;
      };
    }
  | {
      type: "login";
      payload: {
        token: string;
        isAuthenticated: boolean;
        user: string | null;
      };
    }
  | {
      type: "logout";
    };

export function authReducer(
  state: initialStateType,
  action: Action
): initialStateType {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "login":
      return {
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "logout":
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}
