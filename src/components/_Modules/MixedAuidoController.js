import styled from "styled-components";

import MixedAudioBox from "./MixedAudioController/MixedAudioBox";
import MixedAudioPlayer from "./MixedAudioController/MixedAudioPlayer";

import { COLOR_BLACK } from "../../constants/colors";

const MixedAuidoControllerWrapper = styled.div`
  padding: 20px;
  margin: 10px;
  background-color: #e3f0ff;
  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
`;

function MixedAuidoController() {
  return (
    <MixedAuidoControllerWrapper>
      <MixedAudioBox />
      <MixedAudioPlayer />
    </MixedAuidoControllerWrapper>
  );
}

export default MixedAuidoController;
