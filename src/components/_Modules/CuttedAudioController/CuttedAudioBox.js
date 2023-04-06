import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import getSample from "../../../utils/audio/getSample";
import getRawData from "../../../utils/audio/getRawData";
import drawSoundWave from "../../../utils/audio/drawSoundWave";

import handlePlaying from "../../../utils/audio/handlePlaying";
import drawSliderCutted from "../../../utils/audio/drawSliderCutted";
import { COLOR_BLACK } from "../../../constants/colors";

const CuttedAudioWrapper = styled.div`
  margin-left: 50px;
  width: 100%;
  height: 120px;
  background-color: ${COLOR_BLACK};
  cursor: pointer;

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

function CuttedAudioBox({
  source,
  isPlaying,
  isStopped,
  toggleIsStopped,
  handleAudioEnded,
  setCurrentDraggedSource,
  setIsBoxPicked,
}) {
  const canvasRef = useRef();
  const wrapperRef = useRef();
  const [visualizationData, setVisualizationData] = useState();
  const [audioElement, setAudioElement] = useState();
  const [drawInterval, setDrawInterval] = useState();

  const getVisualizationData = async (source) => {
    const sampleData = getSample(await getRawData(source));

    setVisualizationData(sampleData);
  };

  const handleDragStart = () => {
    setIsBoxPicked(true);
    setCurrentDraggedSource(source.blob);
  };

  useEffect(() => {
    if (source.blob) {
      const { blob } = source;
      getVisualizationData(blob);
    }
  }, [source]);

  useEffect(() => {
    if (visualizationData) {
      drawSoundWave(canvasRef, visualizationData);
    }
  }, [visualizationData]);

  useEffect(() => {
    clearInterval(drawInterval);
    if (!source.blob) return;

    const { blob } = source;
    const audio = handlePlaying(
      blob,
      isPlaying,
      audioElement,
      handleAudioEnded,
    );

    audio ? setAudioElement(audio) : false;

    if (visualizationData && isPlaying) {
      let { currentTime } = audioElement ? audioElement : audio;

      if (currentTime) {
        currentTime += 0.125;
      }

      const interval = drawSliderCutted(
        canvasRef,
        wrapperRef,
        visualizationData,
        currentTime,
      );

      setDrawInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isStopped) {
      if (audioElement) {
        handleAudioEnded();
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      drawSoundWave(canvasRef, visualizationData);
      toggleIsStopped();
    }
  }, [isStopped]);

  return (
    <CuttedAudioWrapper
      ref={wrapperRef}
      onDragStart={handleDragStart}
      draggable
    >
      <canvas ref={canvasRef}></canvas>
    </CuttedAudioWrapper>
  );
}

CuttedAudioBox.propTypes = {
  source: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isStopped: PropTypes.bool.isRequired,
  toggleIsStopped: PropTypes.func.isRequired,
  handleAudioEnded: PropTypes.func.isRequired,
  setCurrentDraggedSource: PropTypes.func.isRequired,
  setIsBoxPicked: PropTypes.func.isRequired,
};

export default CuttedAudioBox;
