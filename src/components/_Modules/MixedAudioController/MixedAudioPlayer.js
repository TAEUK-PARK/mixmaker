import { useEffect, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop, FaDownload } from "react-icons/fa";

import { COLOR_GRAY, COLOR_RED, COLOR_WHITE } from "../../../constants/colors";
import getAudioEleFromSource from "../../../utils/audio/getAudioEleFromSource";
import getMergedAudio from "../../../utils/audio/getMergedAudio";

const MixedAudioPlayerWrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
  * {
    margin: 0 5px;
  }
`;

function MixedAudioPlayer({ mixedAudioSources }) {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_WHITE,
  });
  const [audioElement, setAudioElement] = useState();
  const [mixedAudioBlob, setMixedAudioBlob] = useState();

  const handlePlayButtonClick = () => {
    if (!audioElement) return;

    setIsPlaying((prev) => {
      return {
        ...prev,
        state: !prev.state,
      };
    });

    if (!isPlaying.state) {
      audioElement.play();
      audioElement.onended = () => {
        setIsPlaying((prev) => {
          return {
            ...prev,
            state: false,
          };
        });
      };
      return;
    }

    if (isPlaying) {
      audioElement.pause();
      return;
    }
  };

  const handleStopButtonClick = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying((prev) => {
        return {
          ...prev,
          state: false,
        };
      });
    }
  };

  const handleDownloadButtonClick = () => {
    if (mixedAudioBlob) {
      const url = URL.createObjectURL(mixedAudioBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mix.wav");
      document.body.appendChild(link);
      link.click();
    }
  };

  useEffect(() => {
    const audioBlobs = [];
    const mountAudioElement = async () => {
      mixedAudioSources.forEach((source) => {
        audioBlobs.push(source);
      });

      const mergedAudio = await getMergedAudio(audioBlobs);
      const audio = getAudioEleFromSource(mergedAudio);
      setAudioElement(audio);
      setMixedAudioBlob(mergedAudio);
    };

    if (mixedAudioSources.length) {
      mountAudioElement();
    }
  }, [mixedAudioSources]);

  return (
    <MixedAudioPlayerWrapper>
      <Icon color={isPlaying.iconColor} onClick={handlePlayButtonClick}>
        {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
      </Icon>
      <Icon
        color={COLOR_WHITE}
        hoverColor={COLOR_RED}
        onClick={handleStopButtonClick}
      >
        <FaStop />
      </Icon>
      <Icon
        color={COLOR_WHITE}
        hoverColor={COLOR_GRAY}
        onClick={handleDownloadButtonClick}
      >
        <FaDownload />
      </Icon>
    </MixedAudioPlayerWrapper>
  );
}

MixedAudioPlayer.propTypes = {
  mixedAudioSources: PropTypes.array,
};

export default MixedAudioPlayer;
