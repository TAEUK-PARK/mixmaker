import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Text from "../../_Atoms/Text";
import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { COLOR_BLUE, COLOR_GRAY, COLOR_RED } from "../../../constants/colors";
import CuttedAudioBox from "./CuttedAudioBox";

const CuttedAudioWrapper = styled.div`
  width: 90%;
  min-width: 820px;
  height: 150px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

function CuttedAudio({ source }) {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_BLUE,
  });
  const [isStopped, setIsStopped] = useState(false);

  const handlePlayButtonClick = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: !prev.state,
        iconColor: prev.state ? COLOR_BLUE : COLOR_GRAY,
      };
    });
  };

  const handleAudioEnded = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
        iconColor: COLOR_BLUE,
      };
    });
    setIsStopped(true);
  };

  const toggleIsStopped = () => {
    setIsStopped(!isStopped);
  };

  const handleStopClick = () => {
    setIsStopped(true);
  };

  return (
    <CuttedAudioWrapper>
      <Text size={"20px"} width={"50px"}>
        #
      </Text>

      <CuttedAudioBox
        source={source}
        isPlaying={isPlaying.state}
        isStopped={isStopped}
        toggleIsStopped={toggleIsStopped}
        handleAudioEnded={handleAudioEnded}
      ></CuttedAudioBox>

      <Icon
        color={isPlaying.iconColor}
        width={"50px"}
        onClick={handlePlayButtonClick}
      >
        {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
      </Icon>
      <Icon color={COLOR_RED} width={"50px"} onClick={handleStopClick}>
        <FaStop />
      </Icon>

      <Text size={"20px"} width={"300px"}>
        features
      </Text>

      <Icon width={"50px"}>
        <ImCross />
      </Icon>
    </CuttedAudioWrapper>
  );
}

CuttedAudio.propTypes = {
  source: PropTypes.object.isRequired,
};

export default CuttedAudio;
