import { useState } from "react";
import useContracts from "../hooks/contracts";
import Flower from "./Flower";
import { Columns } from "react-bulma-components";

const HortuloImage = ({ tokenId }) => {
  const { getTokenMetadata } = useContracts();

  const [metadata, setMetadata] = useState({});

  getTokenMetadata(tokenId).then((data) => {
    setMetadata(data);
  });

  const color = metadata?.attributes?.find((a) => a.trait_type === "color");
  const name = metadata?.name;
  const retiredCarbonAmount = metadata?.retiredCarbonAmount;

  return (
    <Columns centered textAlign={"center"}>
      <Columns.Column size="full">
        <Flower color={color?.value} />
      </Columns.Column>
      <Columns.Column p={1} size="full">
        {name}
      </Columns.Column>
      <Columns.Column p={1}>
        {retiredCarbonAmount} tons of CO<sup>2</sup>
      </Columns.Column>
    </Columns>
  );
};

export default HortuloImage;
