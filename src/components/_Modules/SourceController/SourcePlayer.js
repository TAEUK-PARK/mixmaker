/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";

import { GiPauseButton, GiThermometerCold } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";
import { HiScissors } from "react-icons/hi";

import { COLOR_BLACK } from "../../../constants/colors";
import {
  SAMPLE_PER_SEC,
  WAVE_WIDTH_MULTIFLIER,
} from "../../../constants/audioProperties";

import drawSoundWave from "../../../utils/audio/drawSoundWave";
import drawSlider from "../../../utils/audio/drawSlider";
import getAudioEleFromSource from "../../../utils/audio/getAudioEleFromSource";
import drawSection from "../../../utils/audio/drawSection";

import trimAudioBuffer from "../../../utils/audio/trimAudioBuffer";
import changeBlobToAudioBuffer from "../../../utils/audio/changeBlobToAudioBuffer";
import changeAudioBufferToBlob from "../../../utils/audio/changeAudioBufferToBlob";
import changeOffsetXToSec from "../../../utils/audio/changeOffsetXToSec";

const SourcePlayerWrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
`;

function SourcePlayer({
  canvasRef,
  wrapperRef,
  visualizationData,
  source,
  addTrimmedAudio,
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

        if (audioElement) {
          audioElement.currentTime = 0;
        }
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
      const from = Math.min(anchor, head);
      const to = Math.max(anchor, head);

      const audio = isAudioChanged
        ? getAudioEleFromSource(source)
        : audioElement
        ? audioElement
        : getAudioEleFromSource(source);
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

    audioElement?.pause();
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

  const handleCutClick = async () => {
    const audioBuffer = await changeBlobToAudioBuffer(source);
    const trimmedAudioBuffer = trimAudioBuffer(audioBuffer, audioSection);

    if (!trimmedAudioBuffer) return;

    const trimmedAudioBlob = changeAudioBufferToBlob(trimmedAudioBuffer);

    const { anchor, head } = audioSection;
    const { sampleRate } = audioBuffer;

    const trimmedAudioData = {
      blob: trimmedAudioBlob,
      start: changeOffsetXToSec(Math.min(anchor, head), sampleRate),
      end: changeOffsetXToSec(Math.max(anchor, head), sampleRate),
    };
    addTrimmedAudio(trimmedAudioData);
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
        audioElement?.pause();
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
      <Icon color={COLOR_BLACK} width={"50px"} onClick={handleStopClick}>
        <FaStop />
      </Icon>
      <Icon color={COLOR_BLACK} width={"50px"} onClick={handleCutClick}>
        <HiScissors />
      </Icon>
    </SourcePlayerWrapper>
  );
}

SourcePlayer.propTypes = {
  visualizationData: PropTypes.object,
  source: PropTypes.object,
  addTrimmedAudio: PropTypes.func.isRequired,
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
