import { useState } from "react";

import styled from "styled-components";

import Text from "../../_Atoms/Text";
import Icon from "../../_Atoms/Icon";

import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { COLOR_BLUE, COLOR_GRAY } from "../../../constants/colors";

const CuttedAudioWrapper = styled.div`
  width: 90%;
  min-width: 820px;
  height: 50px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  * {
    background-color: aqua;
    text-align: center;
  }
`;

function CuttedAudio() {
  const [isPlaying, setIsPlaying] = useState({
    state: false,
    iconColor: COLOR_BLUE,
  });

  const handlePlayButtonClick = () => {
    setIsPlaying((prev) => {
      return {
        ...prev,
        state: !prev.state,
        iconColor: prev.state ? COLOR_BLUE : COLOR_GRAY,
      };
    });
  };

  return (
    <CuttedAudioWrapper>
      <Text size={"20px"} width={"50px"}>
        #
      </Text>

      <Text size={"20px"} width={"150px"}>
        source file 1
      </Text>

      <Text size={"20px"} width={"100px"}>
        0.0000
      </Text>

      <Text size={"20px"} width={"100px"}>
        1.1111
      </Text>

      <Icon
        color={isPlaying.iconColor}
        width={"50px"}
        onClick={handlePlayButtonClick}
      >
        {(isPlaying.state && <GiPauseButton />) || <FaPlay />}
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

export default CuttedAudio;
