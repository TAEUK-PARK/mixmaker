import styled from "styled-components";

import Text from "../../_Atoms/Text";

import { COLOR_GREEN, COLOR_WHITE } from "../../../constants/colors";

const BarWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  * {
    text-align: center;
    margin-right: 8px;
  }
`;

function UpperBar() {
  return (
    <BarWrapper>
      <Text size={"16px"} weight={200} color={COLOR_WHITE}>
        여기에서 잘라낸 오디오를 확인하고
      </Text>
      <Text size={"18px"} weight={700} color={COLOR_GREEN}>
        믹스
      </Text>
      <Text size={"16px"} weight={200} color={COLOR_WHITE}>
        해보세요!
      </Text>
    </BarWrapper>
  );
}

export default UpperBar;
