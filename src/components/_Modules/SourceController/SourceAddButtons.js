import styled from "styled-components";
import PropTypes from "prop-types";

import SourceUploadButton from "./SourceUploadButton";
import SourceRecordButton from "./SourceRecordButton";

const SourceAddButtonsWrapper = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
`;

function SourceAddButtons({ addSource, addVisualizationData }) {
  return (
    <SourceAddButtonsWrapper>
      <SourceRecordButton
        addSource={addSource}
        addVisualizationData={addVisualizationData}
      />
      <SourceUploadButton
        addSource={addSource}
        addVisualizationData={addVisualizationData}
      />
    </SourceAddButtonsWrapper>
  );
}

SourceAddButtons.propTypes = {
  addSource: PropTypes.func.isRequired,
  addVisualizationData: PropTypes.func.isRequired,
};

export default SourceAddButtons;
