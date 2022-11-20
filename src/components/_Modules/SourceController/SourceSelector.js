import { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";
import Text from "../../_Atoms/Text";

import addNumber from "../../../utils/addNumber";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const SelectorWrapper = styled.div`
  display: inline-flex;
  * {
    padding-inline: 5px;
  }
`;

function SourceSelector({ numberOfSources, currentSourceNumber, handleClick }) {
  const handleLeftClick = () => {
    if (currentSourceNumber > 1) {
      handleClick((prev) => {
        return addNumber(prev, -1);
      });
    }
  };

  const handleRightClick = () => {
    if (currentSourceNumber < numberOfSources) {
      handleClick((prev) => {
        return addNumber(prev, 1);
      });
    }
  };

  useEffect(() => {
    handleClick(numberOfSources);
  }, [numberOfSources]);

  return (
    <SelectorWrapper>
      <Icon onClick={handleLeftClick}>
        <FaArrowAltCircleLeft />
      </Icon>
      <Text size={"18px"} selectable={"none"}>
        {currentSourceNumber}/{numberOfSources}
      </Text>
      <Icon onClick={handleRightClick}>
        <FaArrowAltCircleRight />
      </Icon>
    </SelectorWrapper>
  );
}

SourceSelector.propTypes = {
  numberOfSources: PropTypes.number.isRequired,
  currentSourceNumber: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SourceSelector;
