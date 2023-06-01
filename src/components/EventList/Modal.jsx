import React from "react";
import Modal from "react-modal";

import styles from "./Modal.module.scss";
import ModalForm from "./ModalForm";
import ModalUploadImage from "./ModalUploadImage";
import Button from "../UI/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

const MyModal = ({ show, closeModal }) => {
    return (
        <div>
            <Modal className={styles.modal} overlayClassName={styles.overlay} isOpen={show} onRequestClose={closeModal} shouldCloseOnOverlayClick={true} shouldReturnFocusAfterClose={true} shouldCloseOnEsc={true} contentLabel="Example Modal">
                <div className={styles.titleRow}>
                    <h4>Update NFT</h4>
                    <button className={styles.iconButton} aria-label="Close" onClick={closeModal}>
                        <Cross2Icon />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.formColumn}>
                        <ModalForm />
                    </div>
                    <div className={styles.imageColumn}>
                        <ModalUploadImage />
                        <div className={styles.buttonWrapper}>
                            <Button content="generate" size="medium" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyModal;
