import React, { createContext } from "react";

// export default React.createContext({
//   token: null,
//   userId: null,
//   login: () => {},
//   logout: () => {},
// });

export const AuthContext = createContext();
export const initialState = {
  token: null,
  userId: null,
  isAuthenticated: false,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //for local storage

      // localStorage.setItem("userId", JSON.stringify(action.payload.userId));
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        token: action.payload.token,
      };
    case "LOGOUT":
      // localStorage.clear();
      return { ...state, isAuthenticated: false, userId: null };
    default:
      return state;
  }
};
