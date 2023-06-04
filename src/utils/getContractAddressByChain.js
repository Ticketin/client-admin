import { contractAddresses } from "../constants";

export const CONTRACTS = {
    POCKYCOLLECTIONS_CONTRACT: "PockyCollections",
    TICKET_CONTRACT: "Ticket"
}

export const getContractAddressByChain = (chain, contractName) => {
    if (!chain) return;
    try {
        return contractAddresses[chain.id][contractName][0];
    } catch (error) {
        console.log(error);
        // throw new Error("Not found");
    }
};
