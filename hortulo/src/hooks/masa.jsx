import { Masa } from "@masa-finance/masa-sdk/dist/src/index";
import { useNetwork, useSigner } from "wagmi";

export const useMasa = () => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  if (signer) {
    const masa = new Masa({
      signer: signer,
      networkName: chain.name.toLowerCase(),
    });
    return masa;
  }
};
