import { useState } from "react";

import styled from "styled-components";

import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";

import { COLOR_BLACK } from "../../../constants/colors";

const SourcePlayerWrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
`;

function SourcePlayer() {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_BLACK,
  });

  const handlePlayButtonClick = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: !prev.state,
      };
    });
  };

  return (
    <SourcePlayerWrapper>
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
    </SourcePlayerWrapper>
  );
}

export default SourcePlayer;
