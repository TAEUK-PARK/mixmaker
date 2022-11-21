import { useRef, useEffect, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK } from "../../../constants/colors";

import drawSoundWave from "../../../utils/audio/drawSoundWave";
import drawSlider from "../../../utils/audio/drawSlider";

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
  const [isAudioChanged, setIsAudioChanged] = useState(false);
  const [drawInterval, setDrawInterval] = useState();

  const handlePlaySource = () => {
    if (!source) return;

    if (isAudioChanged) {
      const url = window.URL.createObjectURL(source);
      const audio = new Audio(url);
      audio.onended = () => {
        setIsPlaying(false);
      };
      setIsAudioChanged(false);
      setAudioElement(audio);
      setIsPlaying(!isPlaying);

      drawSoundWave(canvasRef, visualizationData);

      const interval = drawSlider(
        canvasRef,
        visualizationData,
        setIsAudioChanged,
        0,
      );
      setDrawInterval(interval);

      audio.play();

      return;
    }

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(!isPlaying);
      clearInterval(drawInterval);

      return;
    }

    const { currentTime } = audioElement;

    drawSoundWave(canvasRef, visualizationData);

    const interval = drawSlider(
      canvasRef,
      visualizationData,
      setIsAudioChanged,
      currentTime + 0.125, //?? 왜 이럴까요..
    );

    audioElement.play();
    setDrawInterval(interval);
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (visualizationData) {
      drawSoundWave(canvasRef, visualizationData);
    }
  }, [visualizationData]);

  useEffect(() => {
    setIsPlaying(false);
    setIsAudioChanged(true);

    if (audioElement) {
      audioElement.pause();
    }
  }, [source]);

  return (
    <SourceWrapper>
      <canvas
        onClick={handlePlaySource}
        onMouseDown={(ev) => {
          console.log(ev);
        }}
        ref={canvasRef}
      ></canvas>
    </SourceWrapper>
  );
}

SourceBox.propTypes = {
  visualizationData: PropTypes.object,
  source: PropTypes.object,
};

export default SourceBox;
