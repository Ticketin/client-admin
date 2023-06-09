import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useContractRead, useNetwork } from "wagmi";
import { pockyCollectionsAbi } from "../../constants";
import { convertUnixTime } from "../../utils/convertUnixTime";
import styles from "./PastEventsList.module.scss";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import { truncateText } from "../../utils/truncateText";
import ModalDetails from "./ModalDetails";

const PastEventsList = () => {
  const [showModal, setShowModal] = useState();
  const [allEvents, setAllEvents] = useState();
  const [pastEvents, setPastEvents] = useState();
  const [clickedEventId, setClickedEventId] = useState();
  const { chain } = useNetwork();

  const handleOpenModal = (eventId) => {
    setShowModal(true);
    setClickedEventId(eventId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setClickedEventId(null);
  };

  const { data, refetch } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "list",
    args: [],
    onSuccess(data) {
      console.log(`succesfully fetched`);
      const currentDate = Math.floor(Date.now());

      const eventsList = data.map((item, index) => {
        return {
          ...item,
          eventId: index,
        };
      });
      setAllEvents(eventsList);

      // filters the currently running events
      const tempPastEvents = eventsList.filter(
        (event) => currentDate > event.endDate
      );
      setPastEvents(tempPastEvents);
    },
  });

  return (
    <>
      <ModalDetails
        show={showModal}
        closeModal={handleCloseModal}
        eventId={clickedEventId}
      />
      <div className={styles.eventsList}>
        <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
          <div className={styles.row}>
            <h4>Past Events List</h4>
            <Tabs.List
              className={styles.tabsList}
              aria-label="Manage your account"
            >
              <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                Past
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                All
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content className={styles.tabsContent} value="tab1">
            {pastEvents
              ? pastEvents.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.eventRow}
                      onClick={() => handleOpenModal(event.eventId)}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          className={styles.eventImage}
                          src={event.imageUrl}
                          alt="event image"
                        />
                      </div>
                      <div className={styles.eventContent}>
                        <div className={styles.column}>
                          <p className={styles.eventTitle}>{event.name}</p>
                          <p className={styles.eventDescription}>
                            {truncateText(event.description)}
                          </p>
                          <div className={styles.textContainer}>
                            <p className={styles.eventDate}>
                              {convertUnixTime(event.startDate.toString())} -{" "}
                              {convertUnixTime(event.endDate.toString())}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </Tabs.Content>
          <Tabs.Content className={styles.tabsContent} value="tab2">
            {allEvents
              ? allEvents.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.eventRow}
                      onClick={() => handleOpenModal(event.eventId)}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          className={styles.eventImage}
                          src={event.imageUrl}
                          alt="event image"
                        />
                      </div>
                      <div className={styles.eventContent}>
                        <div className={styles.column}>
                          <p className={styles.eventTitle}>{event.name}</p>
                          <p className={styles.eventDescription}>
                            {truncateText(event.description)}
                          </p>
                          <div className={styles.textContainer}>
                            <p className={styles.eventDate}>
                              {convertUnixTime(event.startDate.toString())} -{" "}
                              {convertUnixTime(event.endDate.toString())}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default PastEventsList;
