import styled from "styled-components";
import PropTypes from "prop-types";

import UpperBar from "./CuttedAudioController/UpperBar";
import CuttedAudio from "./CuttedAudioController/CuttedAudio";

import { COLOR_BLACK } from "../../constants/colors";
import addNumber from "../../utils/addNumber";

const CuttedAudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  background-color: #e3f0ff;
  margin: 10px;
  padding: 10px;
  max-height: 500px;
  overflow: scroll;

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

function CuttedAudioController({
  trimmedAudios,
  deleteTrimmedAudio,
  setCurrentDraggedSource,
  setIsBoxPicked,
}) {
  return (
    <CuttedAudioWrapper>
      <UpperBar />
      {trimmedAudios.map((audio, index) => {
        return (
          <CuttedAudio
            key={index}
            number={addNumber(index, 1)}
            source={audio}
            deleteTrimmedAudio={deleteTrimmedAudio(index)}
            setCurrentDraggedSource={setCurrentDraggedSource}
            setIsBoxPicked={setIsBoxPicked}
          />
        );
      })}
    </CuttedAudioWrapper>
  );
}

CuttedAudioController.propTypes = {
  trimmedAudios: PropTypes.array.isRequired,
  deleteTrimmedAudio: PropTypes.func.isRequired,
  setCurrentDraggedSource: PropTypes.func.isRequired,
  setIsBoxPicked: PropTypes.func.isRequired,
};

export default CuttedAudioController;
