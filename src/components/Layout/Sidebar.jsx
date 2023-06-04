import React from "react";

import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.mainNavigation}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to={"/event-list"}
            >
              Event List
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to={"/activated"}
            >
              Activated Events
            </NavLink>
          </li>

          <li className={styles.li}>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to={"/generate-event"}
            >
              Generate
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
