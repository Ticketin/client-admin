import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import images from "./../../images";

import styles from "./EventList.module.scss";
import MyModal from "./Modal";

const EventList = () => {
    const [showModal, setShowModal] = useState();

    const handleOpenModal = () => {
        console.log(`clicked handleClickEvent`);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <MyModal show={showModal} closeModal={handleCloseModal} />
            <div className={styles.eventsList}>
                <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
                    <div className={styles.row}>
                        <h4>Event List</h4>
                        <Tabs.List className={styles.tabsList} aria-label="Manage your account">
                            <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                                Now
                            </Tabs.Trigger>
                            <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                                Upcoming
                            </Tabs.Trigger>
                        </Tabs.List>
                    </div>
                    <Tabs.Content className={styles.tabsContent} value="tab1">
                        {images.map((image, index) => {
                            return (
                                <div key={index} className={styles.eventRow} onClick={handleOpenModal}>
                                    <img className={styles.eventImage} src={image} alt="x" />
                                    <div className={styles.eventContent}>
                                        <div className={styles.column}>
                                            <p className={styles.eventTitle}>Melbourne Grand Prix</p>
                                            <p className={styles.eventDescription}>A epic battle between Max Verstappen and Charlex Lerclec, winner takes all!</p>
                                            <div className={styles.textContainer}>
                                                <p className={styles.category}>F1-Racing</p>
                                                <p> | </p>
                                                <p className={styles.eventDate}>04/11/2023 - 05/11/2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Tabs.Content>
                    <Tabs.Content className={styles.tabsContent} value="tab2">
                        <p className="Text">UPCOMING EVENTS</p>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </>
    );
};

export default EventList;
