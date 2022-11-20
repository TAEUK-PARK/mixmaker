import styled from "styled-components";
import PropTypes from "prop-types";

import SourceSelector from "./SourceSelector";
import SourceRemover from "./SourceRemover";

const SourceToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function SourceToolBar({ numberOfSources, currentSourceNumber, handleClick }) {
  return (
    <SourceToolBarWrapper>
      <SourceSelector
        numberOfSources={numberOfSources}
        currentSourceNumber={currentSourceNumber}
        handleClick={handleClick}
      />
      <SourceRemover />
    </SourceToolBarWrapper>
  );
}

SourceToolBar.propTypes = {
  numberOfSources: PropTypes.number.isRequired,
  currentSourceNumber: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SourceToolBar;
