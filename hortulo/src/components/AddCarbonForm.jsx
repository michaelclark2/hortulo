import { Box, Button, Form, Icon } from "react-bulma-components";
import { useContractWrite, useNetwork } from "wagmi";
import useContracts from "../hooks/contracts";
import { useState } from "react";
import { formatEther, parseEther } from "ethers/lib/utils.js";
import NCTSymbol from "../assets/asset_NCT.png";
import { Contracts } from "../utils/constants";
import HortuloABI from "../contracts/Hortulo.json";

const AddCarbonForm = ({ setIsShowForm, tokenId }) => {
  const { getNCTTokenBalance, checkAllowanceNCT, approveNCT } = useContracts();
  const { chain } = useNetwork();
  const [NCTBalance, setNCTBalance] = useState(0);
  const [NCTAllowance, setNCTAllowance] = useState(0);
  const [amountToRetire, setAmountToRetire] = useState("0");
  const [needsApproval, setNeedsApproval] = useState(true);

  getNCTTokenBalance().then((balance) => {
    setNCTBalance(formatEther(balance) * 1);
  });

  checkAllowanceNCT().then((allowance) => {
    setNCTAllowance(formatEther(allowance));
  });

  const { write: sendOffsetCarbon } = useContractWrite({
    address: Contracts.HORTULO_ADDRESS,
    abi: HortuloABI.abi,
    functionName: "offsetCarbon",
    args: [tokenId, parseEther(amountToRetire.toString() || "0")],
  });

  const handleFormChange = (e) => {
    const amount = e.target.value * 1;
    setAmountToRetire(amount);
    console.log(amount, NCTAllowance * 1, NCTBalance);
    if (amount <= NCTAllowance * 1 && amount > 0) {
      setNeedsApproval(false);
    } else {
      setNeedsApproval(true);
    }
  };

  const handleApproval = (e) => {
    approveNCT(amountToRetire.toString()).then(() => {
      setNeedsApproval(false);
    });
  };

  const handleOffsetCarbon = (e) => {
    sendOffsetCarbon();
    setIsShowForm(false);
  };

  return (
    <Box textAlign={"center"} m={"auto"}>
      <Form.Field kind="addon">
        <Form.Control
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Form.Input
            className="is-vertical-centered"
            size={"large"}
            type="number"
            textAlign={"center"}
            value={amountToRetire}
            onChange={handleFormChange}
            mb={2}
            style={{ width: "4em" }}
          />
          <Icon renderAs="img" size={"medium"} src={NCTSymbol} />
        </Form.Control>
        <small className="is-flex is-justify-content-center">
          {Math.round(NCTBalance)} NCT available&nbsp;
          <a
            href={
              chain.name === "Alfajores"
                ? "https://faucet.toucan.earth"
                : "https://app.ubeswap.org/#/swap?outputCurrency=0x02De4766C272abc10Bc88c220D214A26960a7e92"
            }
          >
            Need more?
          </a>
        </small>
        <small></small>
        <Form.Control>
          {needsApproval ? (
            <Button mr={2} color="danger" onClick={handleApproval}>
              Approve
            </Button>
          ) : (
            <Button mr={2} color="danger" onClick={handleOffsetCarbon}>
              Confirm
            </Button>
          )}
          <Button color="warning" onClick={() => setIsShowForm(false)}>
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </Box>
  );
};

export default AddCarbonForm;
