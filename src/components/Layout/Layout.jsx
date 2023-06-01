import React from "react";
import Sidebar from "./Sidebar";

import styles from "./Layout.module.scss";

const Layout = (props) => {
    return (
        <div className={styles.flexContainer}>
            <Sidebar />
            <main className={styles.main}>{props.children}</main>
        </div>
    );
};

export default Layout;
