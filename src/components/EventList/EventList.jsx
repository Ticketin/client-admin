import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useContractRead, useNetwork } from "wagmi";
import { pockyCollectionsAbi } from "../../constants";
import { convertUnixTime } from "../../utils/convertUnixTime";

import styles from "./EventList.module.scss";
import MyModal from "./Modal";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";

const EventList = () => {
  const [showModal, setShowModal] = useState();
  const [eventsNow, setEventsNow] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);
  const { chain } = useNetwork();

  const handleOpenModal = () => {
    console.log(`clicked handleClickEvent`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      const currentDate = Math.floor(Date.now() / 1000);

      // filters the currently running events
      const tempEventsNow = data.filter(
        (event) => currentDate > event.startDate && currentDate < event.endDate
      );
      setEventsNow(tempEventsNow);

      // filter the upcoming events
      const tempEventsUpcoming = data.filter(
        (event) => currentDate < event.startDate
      );
      setEventsUpcoming(tempEventsUpcoming);
    },
  });

  return (
    <>
      <MyModal show={showModal} closeModal={handleCloseModal} />
      <div className={styles.eventsList}>
        <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
          <div className={styles.row}>
            <h4>Event List</h4>
            <Tabs.List
              className={styles.tabsList}
              aria-label="Manage your account"
            >
              <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                Now
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                Upcoming
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content className={styles.tabsContent} value="tab1">
            {eventsNow
              ? eventsNow.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.eventRow}
                      onClick={handleOpenModal}
                    >
                      <img
                        className={styles.eventImage}
                        src={event.imageUrl}
                        alt="event image"
                      />
                      <div className={styles.eventContent}>
                        <div className={styles.column}>
                          <p className={styles.eventTitle}>{event.name}</p>
                          <p className={styles.eventDescription}>
                            {event.description}
                          </p>
                          <div className={styles.textContainer}>
                            <p className={styles.category}>{event.category}</p>
                            <p> | </p>
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
            {eventsUpcoming
              ? eventsUpcoming.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.eventRow}
                      onClick={handleOpenModal}
                    >
                      <img
                        className={styles.eventImage}
                        src={event.imageUrl}
                        alt="event image"
                      />
                      <div className={styles.eventContent}>
                        <div className={styles.column}>
                          <p className={styles.eventTitle}>{event.name}</p>
                          <p className={styles.eventDescription}>
                            {event.description}
                          </p>
                          <div className={styles.textContainer}>
                            <p className={styles.category}>{event.category}</p>
                            <p> | </p>
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

export default EventList;
