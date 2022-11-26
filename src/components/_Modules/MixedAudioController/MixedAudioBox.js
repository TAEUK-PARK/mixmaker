/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import getSample from "../../../utils/audio/getSample";
import getRawData from "../../../utils/audio/getRawData";
import drawSoundWave from "../../../utils/audio/drawSoundWave";

const MixedAudioWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 100px;
  max-width: 300px;
  height: 120px;
  margin-inline-end: 1px;

  border-style: dashed;
  border-radius: 5%;
  border-width: 1px;

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

function MixedAudioBox({ source, handleAddLast }) {
  const canvasRef = useRef();
  const wrapperRef = useRef();
  const [visualizationData, setVisualizationData] = useState();

  const getVisualizationData = async (source) => {
    const sampleData = getSample(await getRawData(source));

    setVisualizationData(sampleData);
  };

  const handleDragStart = (ev) => {
    // console.log("Start", ev.dataTransfer);
  };

  const handleDrag = () => {
    // console.log("Drag");
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
    <MixedAudioWrapper
      ref={wrapperRef}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      draggable
    >
      <canvas ref={canvasRef}></canvas>
    </MixedAudioWrapper>
  );
}

MixedAudioBox.propTypes = {
  source: PropTypes.object,
};

export default MixedAudioBox;
