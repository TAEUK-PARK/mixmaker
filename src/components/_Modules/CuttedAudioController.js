import styled from "styled-components";
import PropTypes from "prop-types";

import UpperBar from "./CuttedAudioController/UpperBar";
import CuttedAudio from "./CuttedAudioController/CuttedAudio";

import { COLOR_BLACK } from "../../constants/colors";

const CuttedAudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  background-color: #e3f0ff;
  margin: 10px;
  padding: 10px;
  overflow-x: scroll;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;

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

function CuttedAudioController({ trimmedAudios, deleteTrimmedAudio }) {
  return (
    <CuttedAudioWrapper>
      <UpperBar />
      {trimmedAudios.map((audio, index) => {
        return (
          <CuttedAudio
            key={index}
            source={audio}
            deleteTrimmedAudio={deleteTrimmedAudio(index)}
          />
        );
      })}
    </CuttedAudioWrapper>
  );
}

CuttedAudioController.propTypes = {
  trimmedAudios: PropTypes.array.isRequired,
  deleteTrimmedAudio: PropTypes.func.isRequired,
};

export default CuttedAudioController;
