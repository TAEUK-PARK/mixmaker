import styled from "styled-components";

import SourceUploadButtons from "./SourceController/SourceUploadButtons";
import SourceToolBar from "./SourceController/SourceToolBar";
import SourceBox from "./SourceController/SourceBox";

const SourceControllerWrapper = styled.div`
  background-color: gray;
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
