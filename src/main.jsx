import ReactDOM from "react-dom/client";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import {
  mainnet,
  goerli,
  hardhat,
  polygonMumbai,
  polygon,
} from "@wagmi/core/chains";
import { ConnectKitProvider } from "connectkit";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/global.scss";
import App from "./App";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const { provider, webSocketProvider, chains } = configureChains(
  [polygonMumbai, hardhat, polygon, goerli],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);

// add new connectors https://wagmi.sh/react/connectors/coinbaseWallet
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: chains,
      options: {
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: chains,
      options: {
        appName: "wagmi.sh",
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig client={client}>
    <ConnectKitProvider
      mode="light"
      customTheme={{
        "--ck-accent-color": "rgb(15 23 42)",
        "--ck-accent-text-color": "#ffffff",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConnectKitProvider>
  </WagmiConfig>
);
