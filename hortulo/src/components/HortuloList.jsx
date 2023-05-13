import { Box, Columns, Heading } from "react-bulma-components";
import HortuloCard from "./HortuloCard";

const HortuloList = ({ tokens }) => {
  if (tokens?.length === 0) {
    return (
      <Box textAlign={"center"}>
        <Heading>This address does not hold any Hortulo.</Heading>
      </Box>
    );
  }
  return (
    <Columns justifyContent="center">
      {tokens?.map((tokenId) => (
        <Columns.Column size={"one-fifth"} key={tokenId}>
          <HortuloCard tokenId={tokenId} />
        </Columns.Column>
      ))}
    </Columns>
  );
};

export default HortuloList;
