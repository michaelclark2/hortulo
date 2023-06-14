import { Masa } from "@masa-finance/masa-sdk/dist/src/index";
import { providers } from "ethers";
import { useAccount, useNetwork } from "wagmi";

export const useMasa = () => {
  const { isConnected } = useAccount();
  const { chain, chainId } = useNetwork();

  const provider = new providers.Web3Provider(window.celo || window.ethereum);
  const signer = provider.getSigner();

  if (signer) {
    const masa = new Masa({
      signer,
      networkName: isConnected ? chain.name.toLowerCase() : "alfajores",
    });
    return masa;
  }
};
