import styled from "styled-components";

import Button from "../_Atoms/Button";

const UploadButtonsWrapper = styled.div`
  display: inline-flex;
`;

function SourceUploadButtons() {
  return (
    <UploadButtonsWrapper>
      <Button value={"Record"} buttonColor={"#989898"} small />
      <Button value={"Upload"} buttonColor={"#989898"} small />
    </UploadButtonsWrapper>
  );
}

export default SourceUploadButtons;
