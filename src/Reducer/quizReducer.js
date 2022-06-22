export const quizReducer = (state, action) => {
  switch (action.type) {
    case "CHECKED":
      return {
        active: action.payload,
      };

    default:
      break;
  }
};
