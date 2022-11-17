import styled from "styled-components";

import UpperBar from "./CuttedAudioController/UpperBar";
import CuttedAudio from "./CuttedAudioController/CuttedAudio";

const CuttedAudioWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  background-color: #e3f0ff;
  padding: 10px;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  > div {
    margin-left: 5%;
  }
`;

function CuttedAudioController() {
  return (
    <CuttedAudioWrapper>
      <UpperBar />
      <CuttedAudio />
      <CuttedAudio />
    </CuttedAudioWrapper>
  );
}

export default CuttedAudioController;
