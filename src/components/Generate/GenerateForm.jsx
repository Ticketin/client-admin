import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import styles from "./GenerateForm.module.scss";
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
import { newCollection } from "../../api/newCollection";
import { UPCOMING_EVENT_DATA } from "../../utils/eventDataPlaceholder";

const GenerateForm = ({
  uploadedImage,
  onUploadIPFS,
  onLoading,
  onError,
  onSuccess,
}) => {
  const API_KEY = import.meta.env.VITE_NFTSTORAGE_API_KEY;
  const client = new NFTStorage({ token: API_KEY });

  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [collectionUpdated, setCollectionUpdated] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [collection, setCollection] = useState(UPCOMING_EVENT_DATA);

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
      {
        name: collection.name,
        priceInETH: collection.priceInETH,
        owner: address,
        maxSupply: collection.maxSupply,
        startDate: collection.startDate, // start date when tickets are avaiable for purchase
        endDate: collection.endDate, // end date when ticket purchase closes
        matchDate: collection.matchDate,
        ticketSvgMetadata: {
          homeTeamName: collection.ticketSvgMetadata.homeTeamName,
          homeTeamSymbol: collection.ticketSvgMetadata.homeTeamSymbol,
          homeTeamLogo: collection.ticketSvgMetadata.homeTeamLogo,
          homeTeamColor: collection.ticketSvgMetadata.homeTeamColor,
          awayTeamName: collection.ticketSvgMetadata.awayTeamName,
          awayTeamSymbol: collection.ticketSvgMetadata.awayTeamName,
          awayTeamLogo: collection.ticketSvgMetadata.awayTeamLogo,
          awayTeamColor: collection.ticketSvgMetadata.awayTeamColor,
          dateLine1: collection.ticketSvgMetadata.dateLine1,
          dateLine2: collection.ticketSvgMetadata.dateLine2,
          locationLine1: collection.ticketSvgMetadata.locationLine1,
          locationLine2: collection.ticketSvgMetadata.locationLine2,
          qrCodeUrl: collection.ticketSvgMetadata.qrCodeUrl,
        },
        eventLocation: collection.eventLocation,
        description: collection.description,
        imageUrl: collection.imageUrl,
        featured: collection.featured,
        updated: collection.updated,
        eventResult: {
          homeScore: "0",
          homeFGM: "",
          homeFGP: "",
          homeTPM: "",
          homeTPP: "",
          homeFTM: "",
          homeFTP: "",
          awayScore: "0",
          awayFGM: "",
          awayFGP: "",
          awayTPM: "",
          awayTPP: "",
          awayFTM: "",
          awayFTP: "",
        },
      },
    ],
  });

  const { data, error, isError, write } = useContractWrite(config);

  // navigates to event-list page after the transaction was succesful
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      onLoading(false)
      onSuccess(true);
      console.log(`succesfully created new event`);
      console.log(data);
      // navigate("/event-list");
    },
  });

  const uploadImageToIPFS = async (uploadedImage) => {
    const imageCid = await client.storeBlob(uploadedImage[0]);
    const ipfsImageUrl = `https://ipfs.io/ipfs/${imageCid}`;
    console.log(ipfsImageUrl);
    setImageUrl(ipfsImageUrl);
    onUploadIPFS(true);
  };

  // uploads image to IPFS, and sets ImageUpload to true to trigger effect
  const onSubmit = async (data) => {
    onLoading(true);
    await uploadImageToIPFS(uploadedImage);
    setImageUploaded(!imageUploaded); // toggle to force re
    console.log(`image uploaded true`);
  };

  // when the image has been uploaded we fetch the collection data from the pockyAPI
  useEffect(() => {
    if (imageUploaded == false) return;
    console.log(`in getting collection effect`);
    const getNewCollection = async () => {
      const collection = await newCollection(
        watchName,
        watchLocation,
        watchDescription,
        imageUrl,
        address,
        new Date(watchStartDate),
        new Date(watchEndDate),
        watchTicketPrice,
        watchTicketAmount,
        watchFeatured
      );
      console.log(`---getting new collection----`);
      setCollection(collection);
      setCollectionUpdated(true);
      console.log(collection);
    };
    refetchPrepare();
    getNewCollection();
  }, [imageUploaded]);

  // wagmi stuff - writes register function after prepareData has changed from previous effect
  useEffect(() => {
    if (imageUploaded == false) return;
    if (collectionUpdated == false) return;
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
      </form>
    </>
  );
};

export default GenerateForm;
