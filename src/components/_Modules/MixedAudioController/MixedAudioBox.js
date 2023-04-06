import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import getSample from "../../../utils/audio/getSample";
import getRawData from "../../../utils/audio/getRawData";
import drawSoundWave from "../../../utils/audio/drawSoundWave";
import Icon from "../../_Atoms/Icon";
import { ImCross } from "react-icons/im";
import { COLOR_BLUE, COLOR_LIGHT_GRAY } from "../../../constants/colors";

const MixedAudioBoxWrapper = styled.div`
  position: relative;
`;

const MixedAudioWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 100px;
  max-width: 300px;
  height: 120px;
  margin-inline-end: 1px;
  padding: 5px;

  border-style: solid;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${COLOR_LIGHT_GRAY};

  overflow-y: hidden;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 6px solid transparent;
  }
`;

const CrossWrapper = styled.div`
  position: relative;
  width: fit-content;
  left: calc(100% - 25px);
  bottom: 80%;
  z-index: 1000;
`;

function MixedAudioBox({ index, source, handleDragOver, handleCrossClick }) {
  const canvasRef = useRef();
  const [visualizationData, setVisualizationData] = useState();

  const getVisualizationData = async (source) => {
    const sampleData = getSample(await getRawData(source));

    setVisualizationData(sampleData);
  };

  useEffect(() => {
    if (source) {
      getVisualizationData(source);
    }
  }, [source]);

  useEffect(() => {
    if (visualizationData) {
      drawSoundWave(canvasRef, visualizationData);
    }
  }, [visualizationData]);

  return (
    <MixedAudioBoxWrapper id={index} onDragOver={handleDragOver} draggable>
      <MixedAudioWrapper>
        <canvas ref={canvasRef}></canvas>
      </MixedAudioWrapper>
      <CrossWrapper>
        <Icon
          size={"15px"}
          color={COLOR_BLUE}
          onClick={handleCrossClick(index)}
        >
          <ImCross />
        </Icon>
      </CrossWrapper>
    </MixedAudioBoxWrapper>
  );
}

MixedAudioBox.propTypes = {
  index: PropTypes.number,
  source: PropTypes.object,
  handleDragOver: PropTypes.func,
  handleCrossClick: PropTypes.func,
};

export default MixedAudioBox;
