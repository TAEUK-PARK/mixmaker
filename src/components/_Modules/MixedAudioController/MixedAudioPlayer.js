/* eslint-disable no-unused-vars */
import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";

import { COLOR_BLACK } from "../../../constants/colors";
import getAudioEleFromSource from "../../../utils/audio/getAudioEleFromSource";
import changeBlobToAudioBuffer from "../../../utils/audio/changeBlobToAudioBuffer";
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

  const handlePlayButtonClick = async () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: !prev.state,
      };
    });

    const audioBlobs = [];
    mixedAudioSources.forEach(async (source) => {
      audioBlobs.push(source);
    });

    const mergedAudio = await getMergedAudio(audioBlobs);
    console.log(mergedAudio);
    getAudioEleFromSource(mergedAudio).play();
  };

  return (
    <MixedAudioPlayerWrapper>
      <Icon
        color={isPlaying.iconColor}
        width={"50px"}
        onClick={handlePlayButtonClick}
      >
        {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
      </Icon>
      <Icon color={COLOR_BLACK}>
        <FaStop />
      </Icon>
    </MixedAudioPlayerWrapper>
  );
}

MixedAudioPlayer.propTypes = {
  mixedAudioSources: PropTypes.array,
};

export default MixedAudioPlayer;
