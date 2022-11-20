import styled from "styled-components";
import PropTypes from "prop-types";

import SourceUploadButton from "./SourceUploadButton";
import SourceRecordButton from "./SourceRecordButton";

const SourceAddButtonsWrapper = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
`;

function SourceAddButtons({ addSource }) {
  return (
    <SourceAddButtonsWrapper>
      <SourceRecordButton addSource={addSource} />
      <SourceUploadButton addSource={addSource} />
    </SourceAddButtonsWrapper>
  );
}

SourceAddButtons.propTypes = {
  addSource: PropTypes.func.isRequired,
};

export default SourceAddButtons;
