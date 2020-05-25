import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import "./App.css";

// import { AuthContext, reducer, initialState } from "./context/auth-context";
export const AuthContext = React.createContext();
const initialState = { isAuthenticated: false, token: null, userId: null };
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userId: null,
      };
    default:
      return {
        ...state,
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [state,updateState]= useState()
  console.log("state from app.js", state);

  return (
    <BrowserRouter className="App">
      <>
        <AuthContext.Provider value={{ state: state, dispatch: dispatch }}>
          <MainNavigation />
          <main>
            <Switch>
              <Route path="/auth" exact component={AuthPage} />
              <Route path="/events" exact component={EventsPage} />
              {!state.isAuthenticated ? (
                <Redirect from="/bookings" to="/auth" exact />
              ) : (
                <Route path="/bookings" exact component={BookingsPage} />
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
