import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Text from "../../_Atoms/Text";
import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import {
  COLOR_GRAY,
  COLOR_GRAY_HIGHLIGHT,
  COLOR_RED,
  COLOR_WHITE,
} from "../../../constants/colors";
import CuttedAudioBox from "./CuttedAudioBox";

const CuttedAudioWrapper = styled.div`
  width: 80%;
  height: 150px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px;

  border-style: solid;
  border-width: 0.5px;
  border-radius: 15px;

  &:hover {
    border-color: ${COLOR_GRAY_HIGHLIGHT};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  * {
    margin: 0 5px;
  }
`;

const TextWrapper = styled.div`
  height: 70%;
`;

function CuttedAudio({
  number,
  source,
  deleteTrimmedAudio,
  setCurrentDraggedSource,
  setIsBoxPicked,
}) {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_WHITE,
  });
  const [isStopped, setIsStopped] = useState(false);

  const handlePlayButtonClick = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: !prev.state,
        iconColor: prev.state ? COLOR_WHITE : COLOR_GRAY_HIGHLIGHT,
      };
    });
  };

  const handleAudioEnded = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: false,
        iconColor: COLOR_WHITE,
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
      <TextWrapper>
        <Text size={"24px"} weight={700} color={COLOR_WHITE}>
          {number + "."}
        </Text>
      </TextWrapper>

      <CuttedAudioBox
        source={source}
        isPlaying={isPlaying.state}
        isStopped={isStopped}
        toggleIsStopped={toggleIsStopped}
        handleAudioEnded={handleAudioEnded}
        setCurrentDraggedSource={setCurrentDraggedSource}
        setIsBoxPicked={setIsBoxPicked}
      ></CuttedAudioBox>

      <ButtonWrapper>
        <Icon color={isPlaying.iconColor} onClick={handlePlayButtonClick}>
          {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
        </Icon>
        <Icon
          color={COLOR_WHITE}
          hoverColor={COLOR_RED}
          onClick={handleStopClick}
        >
          <FaStop />
        </Icon>
        <Icon hoverColor={COLOR_GRAY} onClick={deleteTrimmedAudio}>
          <ImCross />
        </Icon>
      </ButtonWrapper>
    </CuttedAudioWrapper>
  );
}

CuttedAudio.propTypes = {
  number: PropTypes.number.isRequired,
  source: PropTypes.object.isRequired,
  deleteTrimmedAudio: PropTypes.func.isRequired,
  setCurrentDraggedSource: PropTypes.func.isRequired,
  setIsBoxPicked: PropTypes.func.isRequired,
};

export default CuttedAudio;
