import styled from "styled-components";

import SourceSelector from "./SourceSelector";
import SourceRemover from "./SourceRemover";

const SourceToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function SourceToolBar() {
  return (
    <SourceToolBarWrapper>
      <SourceSelector />
      <SourceRemover />
    </SourceToolBarWrapper>
  );
}

export default SourceToolBar;
