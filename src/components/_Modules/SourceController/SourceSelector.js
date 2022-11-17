import { useState } from "react";
import styled from "styled-components";

import Icon from "../../_Atoms/Icon";
import Text from "../../_Atoms/Text";

import addNumber from "../../../utils/addNumber";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const SelectorWrapper = styled.div`
  background-color: gray;
  display: inline-flex;
`;

function SourceSelector() {
  const [numbers, setNumbers] = useState({ current: 0, total: 5 });

  const handleLeftClick = () => {
    if (numbers.current > 0) {
      setNumbers((prev) => {
        return { ...prev, current: addNumber(prev.current, -1) };
      });
    }
  };

  const handleRightClick = () => {
    if (numbers.current < numbers.total) {
      setNumbers((prev) => {
        return { ...prev, current: addNumber(prev.current, 1) };
      });
    }
  };

  return (
    <SelectorWrapper>
      <Icon onClick={handleLeftClick}>
        <FaArrowAltCircleLeft />
      </Icon>
      <Text size={"18px"} selectable={"none"}>
        {numbers.current}/{numbers.total}
      </Text>
      <Icon onClick={handleRightClick}>
        <FaArrowAltCircleRight />
      </Icon>
    </SelectorWrapper>
  );
}

export default SourceSelector;
