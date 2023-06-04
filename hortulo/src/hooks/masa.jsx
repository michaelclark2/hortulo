import { Masa } from "@masa-finance/masa-sdk/dist/src/index";
import { useSigner } from "wagmi";

export const useMasa = () => {
  const { data: signer } = useSigner();
  const masa = signer ? new Masa({ signer: signer }) : null;

  return masa;
};
