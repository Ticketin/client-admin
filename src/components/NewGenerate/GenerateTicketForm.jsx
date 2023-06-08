import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import styles from "./GenerateTicketForm.module.scss";
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
import { useLocation, useNavigate } from "react-router";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import CheckBox from "../UI/CheckBox";

const GenerateTicketForm = ({ uploadedImage }) => {
  const API_KEY = import.meta.env.VITE_NFTSTORAGE_API_KEY;
  const client = new NFTStorage({ token: API_KEY });

  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const { state } = useLocation();
  const {
    name,
    description,
    ticketPrice,
    ticketAmount,
    category,
    startDate,
    endDate,
    location,
    featured,
    collectionImage,
  } = state;

  console.log(state);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "all", // "onChange" + "onBlur"
  });

  const watchHomeTeamName = watch("homeTeamName", false); // false is defeault value
  const watchHomeTeamSymbol = watch("homeTeamSymbol", false);
  const watchHomeTeamLogo = watch("homeTeamLogo", false);
  const watchHomeTeamColor = watch("homeTeamColor", false);
  const watchAwayTeamName = watch("awayTeamName", false);
  const watchAwayTeamSymbol = watch("awayTeamSymbol", false);
  const watchAwayTeamLogo = watch("awayTeamLogo", false);
  const watchAwayTeamColor = watch("awayTeamColor", false);

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
        name: name,
        priceInETH: ticketPrice,
        owner: address,
        maxSupply: ticketAmount,
        startDate: startDate,
        endDate: endDate,
        matchDate: "20230527",
        ticketSvgMetadata: {
          homeTeamName: watchHomeTeamName,
          homeTeamSymbol: watchHomeTeamSymbol,
          homeTeamLogo:
            "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/bos.png",
          homeTeamColor: watchHomeTeamColor,
          awayTeamName: watchAwayTeamName,
          awayTeamSymbol: watchAwayTeamSymbol,
          awayTeamLogo:
            "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/mia.png",
          awayTeamColor: watchAwayTeamColor,
          dateLine1: "WEDNESDAY,",
          dateLine2: "MAY 27 PM 7:00",
          locationLine1: "TD GARDEN,",
          locationLine2: "100 Legends Way, Boston, MA",
          qrCodeUrl: "https://pocky.deno.dev/api/qrcode/0",
        },
        eventLocation: location,
        description: description,
        imageUrl: collectionImage,
        featured: featured,
        updated: false,
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

  async function getExampleImage1() {
    const imageOriginUrl =
      "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/mia.png";
    const r = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
    }
    return r.blob();
  }

  async function getExampleImage2() {
    const imageOriginUrl =
      "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/bos.png";
    const r = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
    }
    return r.blob();
  }

  const client2 = new NFTStorage({ token: API_KEY });

  async function storeExampleNFT() {
    const image = await getExampleImage1();
    const image2 = await getExampleImage2();
    const nft = {
      image: image, // use image Blob as `image` field
      image2: image2,
      name: "Boston vs miami",
      description: "cool",
    };
    const metadata = await client.store(nft);
    console.log(metadata);
  }

  return (
    <>
      <button onClick={storeExampleNFT}>STORE TO IPFS</button>
      <form
        id="generate-form"
        className={styles.registerTicketForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          type="text"
          name="homeTeamName"
          label="Home Team Name"
          placeholder="Enter the name of the Home Team"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Home Team name is required",
          }}
          required
        />
        <InputField
          type="text"
          name="homeTeamSymbol"
          label="Home Team Symbol"
          placeholder="Enter your event description here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Event Description is required.",
          }}
          required
        />
        <div>
          <label>Home Team Logo</label>
          <input type="image" />
        </div>
        <InputField
          type="text"
          name="homeTeamColor"
          label="Home Team Color"
          placeholder="Enter the Color Code here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Home Team Color is required.",
          }}
          required
        />
        <InputField
          type="text"
          name="awayTeamName"
          label="Away Team Name"
          placeholder="Enter the name of the Away Team"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Away Team name is required",
          }}
          required
        />
        <InputField
          type="text"
          name="awayTeamSymbol"
          label="Away Team Symbol"
          placeholder="Enter your Away Team Symbol here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Away Team symbol is required.",
          }}
          required
        />
        <div>
          <label>Away Team Logo</label>
          <input type="image" />
        </div>
        <InputField
          type="text"
          name="awayTeamColor"
          label="Away Team Color"
          placeholder="Enter the Color Code here"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Away Team Color is required.",
          }}
          required
        />
      </form>
    </>
  );
};

export default GenerateTicketForm;
