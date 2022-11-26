import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../_Atoms/Icon";
import MixedAudio from "./MixedAudioController/MixedAudio";
import MixedAudioPlayer from "./MixedAudioController/MixedAudioPlayer";
import MixedAudioBox from "./MixedAudioController/MixedAudioBox";
import MixedAudioInit from "./MixedAudioController/MixedAudioInit";

import { ImCross } from "react-icons/im";

import { COLOR_BLACK, COLOR_BLUE } from "../../constants/colors";
import addNext from "../../utils/draggingSource/addNext";
import getDragOverLocation from "../../utils/draggingSource/getDragOverLocation";
import addLeft from "../../utils/draggingSource/addLeft";
import addRight from "../../utils/draggingSource/addRight";

const MixedAuidoControllerWrapper = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: #e3f0ff;
  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;

  > div {
    margin-left: 5%;
  }
`;

const MixedPlayerWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const CrossWrapper = styled.div`
  position: relative;
  width: fit-content;
  left: calc(100% - 25px);
  bottom: 80%;
  z-index: 1000;
`;

function MixedAuidoController({
  currentDraggedSource,
  isBoxPicked,
  setIsBoxPicked,
}) {
  const [mixedAudioSources, setMixedAudioSources] = useState([]);
  const [isInit, setIsInit] = useState(true);
  const [lastLocation, setLastLocation] = useState("middle");

  const handleInit = () => {
    addNext(currentDraggedSource, setMixedAudioSources, setIsBoxPicked);
    setIsInit(false);
  };

  const handleDragOver = (ev) => {
    const currentLocation = getDragOverLocation(ev);
    const index =
      ev.target.parentElement.parentElement.id || ev.target.parentElement.id;

    if (lastLocation !== currentLocation) {
      setLastLocation(currentLocation);
    }

    if (isBoxPicked) {
      if (currentLocation === "left") {
        addLeft(
          currentDraggedSource,
          setMixedAudioSources,
          setIsBoxPicked,
          index,
        );

        return;
      }

      if (currentLocation === "right") {
        addRight(
          currentDraggedSource,
          setMixedAudioSources,
          setIsBoxPicked,
          index,
        );

        return;
      }
    }
  };

  const handleCrossClick = (index) => {
    return () => {
      if (mixedAudioSources.length === 1) {
        setIsInit(true);
        setMixedAudioSources([]);
      }

      setMixedAudioSources((prev) => {
        const result = prev.slice();
        result.splice(index, 1);

        return result;
      });
    };
  };

  return (
    <MixedAuidoControllerWrapper>
      {isInit && <MixedAudioInit handleInit={handleInit} />}
      {!isInit && (
        <MixedAudio>
          {mixedAudioSources.map((source, index) => {
            return (
              <div
                key={`audioBox${index}`}
                id={index}
                onDragOver={handleDragOver}
              >
                <MixedAudioBox
                  index={index}
                  source={source}
                  handleAddLast={handleDragOver}
                />
                <CrossWrapper>
                  <Icon
                    size={"15px"}
                    color={COLOR_BLUE}
                    onClick={handleCrossClick(index)}
                  >
                    <ImCross />
                  </Icon>
                </CrossWrapper>
              </div>
            );
          })}
        </MixedAudio>
      )}
      <MixedPlayerWrapper>
        <MixedAudioPlayer />
      </MixedPlayerWrapper>
    </MixedAuidoControllerWrapper>
  );
}

MixedAuidoController.propTypes = {
  currentDraggedSource: PropTypes.object,
  isBoxPicked: PropTypes.bool.isRequired,
  setIsBoxPicked: PropTypes.func.isRequired,
};

export default MixedAuidoController;
