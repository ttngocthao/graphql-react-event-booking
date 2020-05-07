import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./mainNavigation.module.scss";
//NavLink :props can be specified
function MainNavigation() {
  return (
    <header>
      <div className="main-nav__logo">
        <h1>Logo</h1>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.navItem}>
            <NavLink to="/auth">Authenticate</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
