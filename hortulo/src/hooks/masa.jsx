import { Masa } from "@masa-finance/masa-sdk/dist/src/index";
import { providers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { celoAlfajores } from "wagmi/chains";

export const useMasa = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const provider = new providers.JsonRpcProvider(
    chain
      ? chain.rpcUrls.default.http[0]
      : celoAlfajores.rpcUrls.default.http[0]
  );
  const signer = provider.getSigner();

  if (signer) {
    const masa = new Masa({
      signer,
      networkName: isConnected ? chain.name.toLowerCase() : "alfajores",
    });
    return masa;
  }
};
