import styled from "styled-components";

import Icon from "../../_Atoms/Icon";

import { ImCross } from "react-icons/im";

const RemoverWrapper = styled.div`
  background-color: gray;
  display: inline-flex;
`;

function SourceRemover() {
  return (
    <RemoverWrapper>
      <Icon>
        <ImCross />
      </Icon>
    </RemoverWrapper>
  );
}

export default SourceRemover;
