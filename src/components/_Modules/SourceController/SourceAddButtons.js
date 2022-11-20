import styled from "styled-components";

import SourceUploadButton from "./SourceUploadButton";
import SourceRecordButton from "./SourceRecordButton";

const SourceAddButtonsWrapper = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
`;

function SourceAddButtons() {
  return (
    <SourceAddButtonsWrapper>
      <SourceRecordButton />
      <SourceUploadButton />
    </SourceAddButtonsWrapper>
  );
}

export default SourceAddButtons;
