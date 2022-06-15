export const authReducer = (state, action) => {
  switch (action.type) {
    case "signup":
      return {
        // isAuthenticated: true,
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
