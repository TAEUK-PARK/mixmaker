import styled from "styled-components";

import Button from "../../_Atoms/Button";

import { COLOR_GRAY } from "../../../constants/colors";

const UploadButtonsWrapper = styled.div`
  display: inline-flex;
  margin: 10px;
`;

function SourceUploadButtons() {
  return (
    <UploadButtonsWrapper>
      <Button value={"Record"} buttonColor={COLOR_GRAY} small />
      <Button value={"Upload"} buttonColor={COLOR_GRAY} small />
    </UploadButtonsWrapper>
  );
}

export default SourceUploadButtons;
