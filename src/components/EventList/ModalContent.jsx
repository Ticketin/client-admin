import React, { useState } from "react";
import styles from "./ModalContent.module.scss";
import {
  useContractRead,
  useNetwork,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { pockyCollectionsAbi, pockyTicketSalesAbi } from "./../../constants";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";

import { ethers } from "ethers";
import Button from "../UI/Button";

const ModalContent = ({ eventId }) => {
  const { chain } = useNetwork();

  const { data: eventData, refetch: fetchEventData } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "get",
    args: [eventId],
    onSuccess(data) {
      console.log(data);
    },
  });

  const { data: balance, refetch: fetchBalance } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYTICKETSALES_CONTRACT
    ),
    abi: pockyTicketSalesAbi,
    functionName: "_balancePerCollectionId",
    args: [eventId],
    watch: true,
    onSuccess(data) {
      console.log(data);
    },
  });

  const {
    config,
    data: prepareData,
    refetch: refetchPrepare,
  } = usePrepareContractWrite({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYTICKETSALES_CONTRACT
    ),
    abi: pockyTicketSalesAbi,
    functionName: "withdrawCollectionRevenue",
    enabled: false,
    args: [eventId],
  });

  const { data, error, isError, write } = useContractWrite(config);

  // navigates to event-list page after the transaction was succesful
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log(`finished withdraw`);
      console.log(data);
      fetchBalance();
    },
  });

  return (
    <div className={styles.modalContent}>
      {eventData && balance ? (
        <>
          <div className={styles.formColumn}>
            <h4>{eventData.name}</h4>
            <p>{eventData.description}</p>
            <p>
              Revenue Generated: {ethers.utils.formatEther(balance.toString())}{" "}
              ETH{" "}
            </p>
          </div>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img className={styles.eventImage} src={eventData.imageUrl} />
            </div>
            <div className={styles.buttonWrapper}>
              <Button size="medium" content="Withdraw Funds" onSubmit={() => write?.()} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ModalContent;
