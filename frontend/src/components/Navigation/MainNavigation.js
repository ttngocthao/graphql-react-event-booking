import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import styles from "./mainNavigation.module.scss";
//NavLink :props can be specified
function MainNavigation() {
  // const { dispatch, state } = useContext(AuthContext);
  // const { isAuthenticated } = state;
  // console.log("state, from main navigation", state);
  return (
    <header>
      <div className="main-nav__logo">
        <h1>Logo</h1>
      </div>
      <nav className={styles.navbar}>
        <ul>
          {/* {!isAuthenticated && ( */}
          <li className={styles.navItem}>
            <NavLink to="/auth">Authenticate</NavLink>
          </li>
          {/* )} */}

          <li className={styles.navItem}>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/testing">Testing</NavLink>
          </li>
          {/* {isAuthenticated && ( */}
          <>
            {/* <li
              className={styles.navItem}
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Logout
            </li> */}
          </>
          {/* )} */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
