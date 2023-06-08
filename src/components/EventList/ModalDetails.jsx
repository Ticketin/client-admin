import React from "react";
import Modal from "react-modal";

import styles from "./ModalDetails.module.scss";
import ModalForm from "./ModalForm";
import ModalUploadImage from "./ModalUploadImage";
import Button from "../UI/Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import ModalContent from "./ModalContent";

const ModalDetails = ({ show, closeModal, eventId }) => {
  return (
    <div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={show}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        shouldCloseOnEsc={true}
        contentLabel="Example Modal"
      >
        <div className={styles.titleRow}>
          <h4>Event Details</h4>
          <button
            className={styles.iconButton}
            aria-label="Close"
            onClick={closeModal}
          >
            <Cross2Icon />
          </button>
        </div>
        <div className={styles.modalContent}>
          <ModalContent eventId={eventId} />
        </div>
      </Modal>
    </div>
  );
};

export default ModalDetails;
