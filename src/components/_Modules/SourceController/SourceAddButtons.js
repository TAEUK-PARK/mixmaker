import styled from "styled-components";
import PropTypes from "prop-types";

import SourceUploadButton from "./SourceUploadButton";
import SourceRecordButton from "./SourceRecordButton";

const SourceAddButtonsWrapper = styled.div`
  display: inline-flex;
`;

function SourceAddButtons({
  numberOfSources,
  addSource,
  addVisualizationData,
  handleCurrentSourceNumber,
}) {
  return (
    <SourceAddButtonsWrapper>
      <SourceRecordButton
        numberOfSources={numberOfSources}
        addSource={addSource}
        addVisualizationData={addVisualizationData}
        handleCurrentSourceNumber={handleCurrentSourceNumber}
      />
      <SourceUploadButton
        numberOfSources={numberOfSources}
        addSource={addSource}
        addVisualizationData={addVisualizationData}
        handleCurrentSourceNumber={handleCurrentSourceNumber}
      />
    </SourceAddButtonsWrapper>
  );
}

SourceAddButtons.propTypes = {
  numberOfSources: PropTypes.number.isRequired,
  addSource: PropTypes.func.isRequired,
  addVisualizationData: PropTypes.func.isRequired,
  handleCurrentSourceNumber: PropTypes.func.isRequired,
};

export default SourceAddButtons;
