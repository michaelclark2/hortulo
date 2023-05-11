import HortuloABI from "../contracts/Hortulo.json";
import ToucanPoolABI from "../contracts/IToucanPoolToken.json";
import { Contracts } from "../utils/constants";
import { useContract, useContractWrite, useSigner } from "wagmi";
import { parseEther, formatEther } from "ethers/lib/utils.js";

const useContracts = () => {
  const { data: signer } = useSigner();

  const { write: sendMint } = useContractWrite({
    address: Contracts.HORTULO_ADDRESS,
    abi: HortuloABI.abi,
    functionName: "mint",
  });

  const NCT = useContract({
    address: Contracts.TOUCAN_NATURE_CARBON_TOKEN,
    abi: ToucanPoolABI,
    signerOrProvider: signer,
  });

  const mint = async () => {
    await sendMint();
  };

  const approveNCT = async (amount) => {
    await NCT.connect(signer).approve(
      Contracts.HORTULO_ADDRESS,
      parseEther(amount)
    );
  };

  const checkAllowanceNCT = async () => {
    return await NCT.connect(signer).allowance(
      Contracts.HORTULO_ADDRESS,
      Contracts.TOUCAN_NATURE_CARBON_TOKEN
    );
  };

  return { mint, approveNCT, checkAllowanceNCT };
};

export default useContracts;
