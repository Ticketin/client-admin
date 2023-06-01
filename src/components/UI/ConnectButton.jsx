import { ConnectKitButton } from "connectkit";

import styles from "./ConnectButton.module.scss";

const ConnectButton = ({ onClick }) => {
    return (
        <ConnectKitButton
            className={styles.connectButton}
            customTheme={{
                "--ck-connectbutton-color": "#ffffff",
                "--ck-connectbutton-background": "rgb(51 65 85)",
                "--ck-connectbutton-border-radius": "6px",
                "--ck-connectbutton-font-weight": "400",
            }}
        />
    );
};

export default ConnectButton;
