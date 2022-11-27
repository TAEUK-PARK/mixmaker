import { useEffect, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";

import { COLOR_BLACK, COLOR_BLUE } from "../../../constants/colors";
import getAudioEleFromSource from "../../../utils/audio/getAudioEleFromSource";
import getMergedAudio from "../../../utils/audio/getMergedAudio";

const MixedAudioPlayerWrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
`;

function MixedAudioPlayer({ mixedAudioSources }) {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_BLACK,
  });
  const [audioElement, setAudioElement] = useState();
  const [mixedAudioBlob, setMixedAudioBlob] = useState();

  const handlePlayButtonClick = () => {
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
      <Icon
        color={isPlaying.iconColor}
        width={"50px"}
        onClick={handlePlayButtonClick}
      >
        {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
      </Icon>
      <Icon color={COLOR_BLACK} width={"50px"} onClick={handleStopButtonClick}>
        <FaStop />
      </Icon>
      <Icon
        color={COLOR_BLUE}
        width={"50px"}
        onClick={handleDownloadButtonClick}
      >
        <FaStop />
      </Icon>
    </MixedAudioPlayerWrapper>
  );
}

MixedAudioPlayer.propTypes = {
  mixedAudioSources: PropTypes.array,
};

export default MixedAudioPlayer;
