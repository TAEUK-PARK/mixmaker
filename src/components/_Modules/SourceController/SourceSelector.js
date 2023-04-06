import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";
import Text from "../../_Atoms/Text";

import addNumber from "../../../utils/addNumber";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { COLOR_WHITE } from "../../../constants/colors";

const SelectorWrapper = styled.div`
  display: inline-flex;
  * {
    padding-inline: 5px;
  }
`;

function SourceSelector({
  numberOfSources,
  currentSourceNumber,
  handleCurrentSourceNumber,
}) {
  const handleLeftClick = () => {
    if (currentSourceNumber > 1) {
      handleCurrentSourceNumber((prev) => {
        return addNumber(prev, -1);
      });
    }
  };

  const handleRightClick = () => {
    if (currentSourceNumber < numberOfSources) {
      handleCurrentSourceNumber((prev) => {
        return addNumber(prev, 1);
      });
    }
  };

  return (
    <SelectorWrapper>
      <Icon onClick={handleLeftClick}>
        <FaArrowAltCircleLeft data-testid={"moveSelectionLeft"} />
      </Icon>
      <Text size={"16px"} selectable={"none"} color={COLOR_WHITE}>
        {currentSourceNumber}/{numberOfSources}
      </Text>
      <Icon onClick={handleRightClick}>
        <FaArrowAltCircleRight data-testid={"moveSelectionRight"} />
      </Icon>
    </SelectorWrapper>
  );
}

SourceSelector.propTypes = {
  numberOfSources: PropTypes.number.isRequired,
  currentSourceNumber: PropTypes.number.isRequired,
  handleCurrentSourceNumber: PropTypes.func.isRequired,
};

export default SourceSelector;
