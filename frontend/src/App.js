import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import "./App.css";

import { AuthContext, reducer, initialState } from "./context/auth-context";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter className="App">
      <>
        <AuthContext.Provider value={{ state, dispatch }}>
          <MainNavigation />
          <main>
            <Switch>
              <Route path="/events" exact component={EventsPage} />
              {!state.isAuthenticated && (
                <>
                  <Redirect to="/auth" exact />
                  <Route path="/auth" exact component={AuthPage} />
                </>
              )}

              {state.isAuthenticated && (
                <>
                  <Redirect from="/" to="/events" exact />
                  <Redirect from="/auth" to="/events" exact />
                  <Route path="/bookings" exact component={BookingsPage} />
                </>
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
