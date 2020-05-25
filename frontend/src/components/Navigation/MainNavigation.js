import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../App";

import styles from "./mainNavigation.module.scss";
//NavLink :props can be specified
function MainNavigation(props) {
  // const { dispatch, state } = useContext(AuthContext);
  // const { isAuthenticated } = state;
  // console.log("state, from main navigation", state);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext.state;
  //console.log("props.history", props.history);
  const logOutHandler = () => {
    authContext.dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <header>
      <div className="main-nav__logo">
        <h1>Logo</h1>
      </div>
      <nav className={styles.navbar}>
        <ul>
          {!isAuthenticated && (
            <li className={styles.navItem}>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          {/* )} */}

          <li className={styles.navItem}>
            <NavLink to="/events">Events</NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li className={styles.navItem}>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li className={styles.navItem} onClick={logOutHandler}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
