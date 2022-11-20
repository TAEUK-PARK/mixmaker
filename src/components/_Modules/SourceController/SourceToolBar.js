import styled from "styled-components";
import PropTypes from "prop-types";

import SourceSelector from "./SourceSelector";
import SourceRemover from "./SourceRemover";

const SourceToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function SourceToolBar({
  numberOfSources,
  currentSourceNumber,
  handleCurrentSourceNumber,
}) {
  return (
    <SourceToolBarWrapper>
      <SourceSelector
        numberOfSources={numberOfSources}
        currentSourceNumber={currentSourceNumber}
        handleCurrentSourceNumber={handleCurrentSourceNumber}
      />
      <SourceRemover />
    </SourceToolBarWrapper>
  );
}

SourceToolBar.propTypes = {
  numberOfSources: PropTypes.number.isRequired,
  currentSourceNumber: PropTypes.number.isRequired,
  handleCurrentSourceNumber: PropTypes.func.isRequired,
};

export default SourceToolBar;
