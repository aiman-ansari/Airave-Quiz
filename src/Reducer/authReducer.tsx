type Action =
  | {
      type: "signup";
      payload: any;
    }
  | {
      type: "login";
      payload: any;
    }
  | {
      type: "logout";
    };

export const authReducer = (state: any, action: Action) => {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        token: action.payload.uid,
        user: action.payload.displayName,
      };
    case "login":
      return {
        isAuthenticated: true,
        token: action.payload.uid,
        user: action.payload.displayName,
      };
    case "logout":
      return {
        isAuthenticated: false,
      };
    default:
      break;
  }
};
