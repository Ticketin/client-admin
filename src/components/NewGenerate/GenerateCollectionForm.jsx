import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import styles from "./GenerateCollectionForm.module.scss";
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

const GenerateCollectionForm = ({ collectionImage }) => {
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

  function dateTimeToTimestamp(dateTime) {
    const date = new Date(dateTime);
    const timestamp = Math.floor(date.getTime() / 1000);
    return timestamp;
  }

  // uploads image to IPFS, and sets ImageUpload to true to trigger effect
  const onSubmit = async (data) => {
    setImageUploaded(true);
    console.log(`image uploaded true`);
    console.log(data);
    navigate("./../ticket", { state: {collectionImage, ...data }});
  };

  return (
    <>
      <form
        id="generate-collection-form"
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

export default GenerateCollectionForm;
