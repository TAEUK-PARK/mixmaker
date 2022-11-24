import styled from "styled-components";

import Text from "../../_Atoms/Text";

import { COLOR_BLACK } from "../../../constants/colors";

const BarWrapper = styled.div`
  width: 90%;
  min-width: 820px;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
  background-color: white;

  * {
    text-align: center;
  }
`;

function UpperBar() {
  return (
    <BarWrapper>
      <Text size={"20px"}>잘라낸 오디오를 확인하고 믹스해보세요!</Text>
    </BarWrapper>
  );
}

export default UpperBar;
