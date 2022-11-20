import { useRef, useEffect, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK } from "../../../constants/colors";

import drawSoundWave from "../../../utils/audio/drawSoundWave";

const SourceWrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: #e3f0ff;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;

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

function SourceBox({ visualizationData, source }) {
  const canvasRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState();

  const handlePlaySource = () => {
    if (!source) return;

    const url = window.URL.createObjectURL(source);
    const audio = new Audio(url);

    setAudioElement(audio);

    if (isPlaying) {
      setIsPlaying(!isPlaying);
      audioElement.pause();

      return;
    }

    setIsPlaying(!isPlaying);
    audio.play();
  };

  useEffect(() => {
    if (visualizationData) {
      drawSoundWave(canvasRef, visualizationData);
    }
  }, [visualizationData]);

  useEffect(() => {
    setIsPlaying(false);

    if (audioElement) {
      audioElement.pause();
    }
  }, [source]);

  return (
    <SourceWrapper>
      <canvas onClick={handlePlaySource} ref={canvasRef}></canvas>
    </SourceWrapper>
  );
}

SourceBox.propTypes = {
  visualizationData: PropTypes.object,
  source: PropTypes.object,
};

export default SourceBox;
