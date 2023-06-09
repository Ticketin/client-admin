import React, { useEffect, useState } from "react";

import logo from "./../../assets/logo.svg";

import styles from "./Landing.module.scss";
import ConnectButton from "../UI/ConnectButton";
import { useAccount } from "wagmi";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
    const { isConnected } = useAccount();
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setClicked(true);
    };

    useEffect(() => {
        if (!clicked || !isConnected) return;
        console.log(`in use-effect`);
        navigate("/active-events");
    }, [isConnected, clicked, navigate]);

    return (
        <div className={styles.landing}>
            <div className={styles.content}>
                <div className={styles.logoWrapper}>
                    <img src={logo}></img>
                </div>
                <p className={styles.intro}>
                    Generate dynamic NFTs and <br /> Make memories.
                </p>
                <div className={styles.buttonWrapper} onClick={handleClick}>
                    <ConnectButton />
                </div>
            </div>
        </div>
    );
};

export default Landing;
