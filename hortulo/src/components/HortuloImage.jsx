import { useEffect, useState } from "react";
import useContracts from "../hooks/contracts";
import Flower from "./Flower";

const HortuloImage = ({ tokenId }) => {
  const { getTokenMetadata } = useContracts();

  const [metadata, setMetadata] = useState({});

  getTokenMetadata(tokenId).then((data) => {
    setMetadata(data);
  });

  const color = metadata?.attributes?.find((a) => a.trait_type === "color");

  return <Flower color={color?.value} />;
};

export default HortuloImage;
