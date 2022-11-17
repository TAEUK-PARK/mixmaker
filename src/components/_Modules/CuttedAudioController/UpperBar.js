import styled from "styled-components";

import Text from "../../_Atoms/Text";

import { COLOR_BLACK } from "../../../constants/colors";

const BarWrapper = styled.div`
  width: 90%;
  min-width: 820px;
  height: 50px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
  background-color: white;

  * {
    background-color: aqua;
    text-align: center;
  }
`;

function UpperBar() {
  return (
    <BarWrapper>
      <Text size={"20px"} width={"50px"}>
        #
      </Text>
      <Text size={"20px"} width={"150px"}>
        source file
      </Text>
      <Text size={"20px"} width={"100px"}>
        start
      </Text>
      <Text size={"20px"} width={"100px"}>
        end
      </Text>
      <Text size={"20px"} width={"50px"}></Text>
      <Text size={"20px"} width={"300px"}></Text>
      <Text size={"20px"} width={"50px"}>
        d
      </Text>
    </BarWrapper>
  );
}

export default UpperBar;
