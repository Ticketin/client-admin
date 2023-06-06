import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import styles from "./GenerateForm.module.scss";
import Dropdown from "../UI/Dropdown";
import DateField from "../UI/DateField";
import { NFTStorage } from "nft.storage";
import { useEffect } from "react";
import { pockyCollectionsAbi } from "../../constants";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import CheckBox from "../UI/CheckBox";

const GenerateForm = ({ uploadedImage }) => {
  const API_KEY = import.meta.env.VITE_NFTSTORAGE_API_KEY;
  const client = new NFTStorage({ token: API_KEY });

  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "all", // "onChange" + "onBlur"
  });

  const watchName = watch("name", false); // false is defeault value
  const watchDescription = watch("description", false);
  const watchTicketPrice = watch("ticketPrice", false);
  const watchTicketAmount = watch("ticketAmount", false);
  const watchCategory = watch("category", false);
  const watchFeatured = watch("featured", false);
  const watchStartDate = watch("startDate", false);
  const watchEndDate = watch("endDate", false);
  const watchLocation = watch("location", false);

  const {
    config,
    data: prepareData,
    refetch: refetchPrepare,
  } = usePrepareContractWrite({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "register",
    enabled: imageUploaded,
    args: [
      [
        watchName, // event name
        watchCategory, // event category
        watchTicketPrice, // price per ticket (in ETH)
        address, // the owner of the deployed collection (= currently signed in account)
        watchTicketAmount, // total amount of avaiable tickets
        "x", // default value for dateText
        dateTimeToTimestamp(watchStartDate), // event start date
        dateTimeToTimestamp(watchEndDate), // event end date
        "x", // defaultl value for matchDate
        watchLocation, // event location
        watchDescription, // event description
        imageUrl, // event cover image (before update)
        watchFeatured, // value to set a featured event
        false, // default value for updated
        ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"], // default value for eventResult struct
      ],
    ],
  });

  const { data, error, isError, write } = useContractWrite(config);

  // navigates to event-list page after the transaction was succesful
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log(`finished`);
      console.log(data);
      navigate("/event-list");
    },
  });

  const uploadImageToIPFS = async (uploadedImage) => {
    const imageCid = await client.storeBlob(uploadedImage[0]);
    const ipfsImageUrl = `https://ipfs.io/ipfs/${imageCid}`;
    console.log(ipfsImageUrl);
    setImageUrl(ipfsImageUrl);
  };

  function dateTimeToTimestamp(dateTime) {
    const date = new Date(dateTime);
    const timestamp = Math.floor(date.getTime() / 1000);
    return timestamp;
  }

  // uploads image to IPFS, and sets ImageUpload to true to trigger effect
  const onSubmit = async (data) => {
    await uploadImageToIPFS(uploadedImage);
    setImageUploaded(true);
    console.log(`image uploaded true`);
  };

  // wagmi stuff - refetch the prepare date (to get most recent imageIPFS CID from state)
  useEffect(() => {
    if (imageUploaded == false) return;
    console.log(`refetched prepare...`);
    refetchPrepare();
    console.log(`done refetching`);
  }, [imageUploaded]);

  // wagmi stuff - writes register function after prepareData has changed from previous effect
  useEffect(() => {
    if (imageUploaded == false) return;
    console.log(`trying to write..`);
    write?.();
    console.log(`written..`);
  }, [prepareData]);

  return (
    <>
      <form
        id="generate-form"
        className={styles.registerTicketForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          type="text"
          name="name"
          label="Event Name"
          placeholder="Enter your event name here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Event Name is required",
          }}
          required
        />
        <InputField
          type="text"
          name="description"
          label="Event Description"
          placeholder="Enter your event description here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Event Description is required.",
          }}
          required
        />
        <InputField
          type="number"
          name="ticketPrice"
          label="Ticket Price"
          placeholder="Enter the price per ticket in ETH here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Ticket Price is required.",
          }}
          required
        />
        <InputField
          type="number"
          name="ticketAmount"
          label="Total Amount of Tickets"
          placeholder="Enter the total amount of tickets here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Ticket Amount is required.",
          }}
          required
        />
        <Dropdown
          name="category"
          label="Category"
          register={register}
          options={[
            { type: "NBA", value: "NBA" },
            { type: "UFC", value: "UFC" },
          ]}
          errors={errors}
          validationSchema={{
            required: "Role is required.",
          }}
          required
        />
        <CheckBox name="featured" label="Featured Event" register={register} />

        <DateField
          type="text"
          name="startDate"
          label="Start Date"
          placeholder="Enter the starting date and time here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Event Start Date is required.",
          }}
          required
        />
        <DateField
          type="text"
          name="endDate"
          label="End Date"
          placeholder="Enter the end date and time here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Event End Date is required.",
          }}
          required
        />
        <InputField
          type="text"
          name="location"
          label="Event Location"
          placeholder="Enter the location of your event here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Location is required",
          }}
          required
        />
      </form>
    </>
  );
};

export default GenerateForm;
