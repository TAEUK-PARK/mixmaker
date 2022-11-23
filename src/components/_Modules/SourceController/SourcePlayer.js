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
import getLargestNumber from "../../../utils/getLargestNumber";
import {
  SAMPLE_PER_SEC,
  WAVE_WIDTH_MULTIFLIER,
} from "../../../constants/audioProperties";
import getAudioEleFromSource from "../../../utils/audio/getAudioEleFromSource";
import drawSection from "../../../utils/audio/drawSection";
import getSmallestNumber from "../../../utils/getSmallestNumber";

const SourcePlayerWrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
`;

function SourcePlayer({
  canvasRef,
  wrapperRef,
  visualizationData,
  source,
  audioSection,
  setAudioSection,
}) {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_BLACK,
  });
  const [playingTimer, setPlayingTimer] = useState();
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

    if (audioSection.anchor === audioSection.head) {
      if (audioSection.anchor !== 0) {
        setAudioSection(() => {
          return { anchor: 0, head: 0 };
        });

        audioElement.currentTime = 0;
      }

      if (isAudioChanged) {
        const audio = getAudioEleFromSource(source);
        setAudioElement(audio);

        audio.onended = () => {
          setIsPlaying((prev) => {
            return {
              ...prev,
              state: false,
            };
          });
        };
        setIsAudioChanged(false);

        drawSoundWave(canvasRef, visualizationData);

        const interval = drawSlider(
          canvasRef,
          wrapperRef,
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
        wrapperRef,
        visualizationData,
        setIsAudioChanged,
        currentTime + 0.125,
      );

      audioElement.play();
      setDrawInterval(interval);

      return;
    }

    if (audioSection.anchor !== 0 || audioSection.head !== 0) {
      const { anchor, head } = audioSection;
      const from = getSmallestNumber(anchor, head);
      const to = getLargestNumber(anchor, head);

      const audio = audioElement ? audioElement : getAudioEleFromSource(source);
      setAudioElement(audio);

      audio.currentTime = from / (SAMPLE_PER_SEC * WAVE_WIDTH_MULTIFLIER);
      const timer = setTimeout(() => {
        setIsPlaying((prev) => {
          return {
            ...prev,
            state: false,
          };
        });

        audio.pause();
      }, ((to - from) * 1000) / (SAMPLE_PER_SEC * WAVE_WIDTH_MULTIFLIER));
      setPlayingTimer(timer);

      audio.play();

      return;
    }
  };

  const handlePauseClick = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
      };
    });

    audioElement.pause();
    clearTimeout(playingTimer);
    clearInterval(drawInterval);
  };

  const handleStopClick = () => {
    if (!source || !audioElement) return;

    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
      };
    });

    audioElement.pause();
    audioElement.currentTime = 0;
    clearTimeout(playingTimer);
    clearInterval(drawInterval);

    if (audioSection.anchor === 0 && audioSection.head === 0) {
      drawSoundWave(canvasRef, visualizationData);
    }
  };

  useEffect(() => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
      };
    });

    if (visualizationData) {
      clearInterval(drawInterval);
      drawSoundWave(canvasRef, visualizationData);
    }

    setIsAudioChanged(true);

    setAudioSection(() => {
      return { anchor: 0, head: 0 };
    });

    if (audioElement) {
      audioElement.pause();
    }
  }, [source]);

  useEffect(() => {
    if (visualizationData) {
      drawSoundWave(canvasRef, visualizationData);
    }
  }, [visualizationData]);

  useEffect(() => {
    setAudioSection(() => {
      return { anchor: 0, head: 0 };
    });
  }, [isAudioChanged]);

  useEffect(() => {
    if (visualizationData) {
      if (audioSection.anchor !== 0 || audioSection.head !== 0) {
        clearInterval(drawInterval);
        drawSoundWave(canvasRef, visualizationData);
        drawSection(canvasRef, audioSection, visualizationData);
        setIsPlaying((prev) => {
          return {
            ...prev,
            state: false,
          };
        });
        audioElement.pause();
      }
    }
  }, [audioSection]);

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
  audioSection: PropTypes.object.isRequired,
  setAudioSection: PropTypes.func.isRequired,
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLCanvasElement),
  }),
  wrapperRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement),
  }),
};

export default SourcePlayer;
