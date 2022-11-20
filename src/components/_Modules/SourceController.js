import styled from "styled-components";

import SourceUploadButtons from "./SourceController/SourceAddButtons";
import SourceToolBar from "./SourceController/SourceToolBar";
import SourceBox from "./SourceController/SourceBox";

import { COLOR_BLACK } from "../../constants/colors";

const SourceControllerWrapper = styled.div`
  padding: 20px;
  margin: 10px;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
`;

function SourceController() {
  return (
    <SourceControllerWrapper>
      <SourceUploadButtons />
      <SourceToolBar />
      <SourceBox />
    </SourceControllerWrapper>
  );
}

export default SourceController;
