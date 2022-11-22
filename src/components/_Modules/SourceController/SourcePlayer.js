/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";

import { COLOR_BLACK } from "../../../constants/colors";

import drawSoundWave from "../../../utils/audio/drawSoundWave";
import drawSlider from "../../../utils/audio/drawSlider";

const SourcePlayerWrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
`;

function SourcePlayer({ canvasRef, visualizationData, source }) {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_BLACK,
  });
  const [isAudioChanged, setIsAudioChanged] = useState(false);
  const [audioElement, setAudioElement] = useState();
  const [drawInterval, setDrawInterval] = useState();

  const handlePlayClick = () => {
    if (!source) return;

    setIsPlaying((prev) => {
      return {
        ...prev,
        state: true,
      };
    });

    if (isAudioChanged) {
      const url = window.URL.createObjectURL(source);
      const audio = new Audio(url);
      audio.onended = () => {
        setIsPlaying((prev) => {
          return {
            ...prev,
            state: false,
          };
        });
      };
      setIsAudioChanged(false);
      setAudioElement(audio);

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

    const { currentTime } = audioElement;

    drawSoundWave(canvasRef, visualizationData);

    const interval = drawSlider(
      canvasRef,
      visualizationData,
      setIsAudioChanged,
      currentTime + 0.125,
    );

    audioElement.play();
    setDrawInterval(interval);
  };

  const handlePauseClick = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
      };
    });

    audioElement.pause();
    clearInterval(drawInterval);
  };

  const handleStopClick = () => {
    if (!source) return;

    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
      };
    });

    audioElement.pause();
    audioElement.currentTime = 0;
    clearInterval(drawInterval);
    drawSoundWave(canvasRef, visualizationData);
  };

  useEffect(() => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
      };
    });
    setIsAudioChanged(true);

    if (visualizationData) {
      clearInterval(drawInterval);
      drawSoundWave(canvasRef, visualizationData);
    }

    if (audioElement) {
      audioElement.pause();
    }
  }, [source]);

  useEffect(() => {
    if (visualizationData) {
      drawSoundWave(canvasRef, visualizationData);
    }
  }, [visualizationData]);

  return (
    <SourcePlayerWrapper>
      <Icon
        color={isPlaying.iconColor}
        width={"50px"}
        onClick={isPlaying.state ? handlePauseClick : handlePlayClick}
      >
        {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
      </Icon>
      <Icon onClick={handleStopClick} color={COLOR_BLACK}>
        <FaStop />
      </Icon>
    </SourcePlayerWrapper>
  );
}

SourcePlayer.propTypes = {
  visualizationData: PropTypes.object,
  source: PropTypes.object,
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLCanvasElement),
  }),
};

export default SourcePlayer;
