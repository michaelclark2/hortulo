import HortuloABI from "../contracts/Hortulo.json";
import ToucanPoolABI from "../contracts/IToucanPoolToken.json";
import { Contracts } from "../utils/constants";
import {
  useContract,
  useContractRead,
  useContractReads,
  useContractWrite,
  useSigner,
} from "wagmi";
import { parseEther, formatEther } from "ethers/lib/utils.js";

const useContracts = () => {
  const { data: signer } = useSigner();

  const { write: sendMint } = useContractWrite({
    address: Contracts.HORTULO_ADDRESS,
    abi: HortuloABI.abi,
    functionName: "mint",
  });

  const tokensByOwner = (address) => {
    return useContractRead({
      address: Contracts.HORTULO_ADDRESS,
      abi: HortuloABI.abi,
      functionName: "tokensByOwner",
      args: [address],
    });
  };

  const getTokenMetadata = async (tokenId) => {
    const { data } = useContractReads({
      contracts: [
        {
          address: Contracts.HORTULO_ADDRESS,
          abi: HortuloABI.abi,
          functionName: "tokenURI",
          args: [tokenId],
        },
        {
          address: Contracts.HORTULO_ADDRESS,
          abi: HortuloABI.abi,
          functionName: "getRetiredCarbonAmount",
          args: [tokenId],
        },
        {
          address: Contracts.HORTULO_ADDRESS,
          abi: HortuloABI.abi,
          functionName: "ownerOf",
          args: [tokenId],
        },
      ],
    });
    const result = await fetch(data[0] + ".json");
    const metadata = await result.json();
    metadata["retiredCarbonAmount"] = formatEther(data[1]);
    metadata["owner"] = data[2];
    return metadata;
  };

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
      await signer.getAddress(),
      Contracts.HORTULO_ADDRESS
    );
  };

  const getNCTTokenBalance = async () => {
    const balance = await NCT.connect(signer).balanceOf(
      await signer.getAddress()
    );
    return balance;
  };

  return {
    mint,
    approveNCT,
    checkAllowanceNCT,
    tokensByOwner,
    getTokenMetadata,
    getNCTTokenBalance,
  };
};

export default useContracts;
