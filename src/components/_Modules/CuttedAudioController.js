import styled from "styled-components";
import PropTypes from "prop-types";

import UpperBar from "./CuttedAudioController/UpperBar";
import CuttedAudio from "./CuttedAudioController/CuttedAudio";

import { COLOR_BLACK, COLOR_LIGHT_GRAY } from "../../constants/colors";
import addNumber from "../../utils/addNumber";
import { useState, useEffect } from "react";

const CuttedAudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: ${(props) => `${props.height - 530}px`};
  background-color: ${COLOR_BLACK};
  padding: 30px 30px;
  overflow-x: hidden;
  overflow-y: hidden;

  > div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-style: solid;
    border-width: 0.5px;
    border-radius: 15px;
    border-color: ${COLOR_LIGHT_GRAY};
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #2f3542;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
  }
`;

function CuttedAudioController({
  trimmedAudios,
  deleteTrimmedAudio,
  setCurrentDraggedSource,
  setIsBoxPicked,
}) {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CuttedAudioWrapper height={height}>
      <div>
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
      </div>
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
