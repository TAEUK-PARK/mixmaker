import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import MixedAudio from "./MixedAudioController/MixedAudio";
import MixedAudioPlayer from "./MixedAudioController/MixedAudioPlayer";
import MixedAudioBox from "./MixedAudioController/MixedAudioBox";
import MixedAudioInit from "./MixedAudioController/MixedAudioInit";

import { COLOR_BLACK } from "../../constants/colors";
import addNext from "../../utils/draggingSource/addNext";
import getDragOverLocation from "../../utils/draggingSource/getDragOverLocation";
import addLeft from "../../utils/draggingSource/addLeft";
import addRight from "../../utils/draggingSource/addRight";

const MixedAudioControllerWrapper = styled.div`
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
  padding-right: 5%;
`;

function MixedAudioController({
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
    const index = Number(
      ev.target.parentElement.parentElement.id || ev.target.parentElement.id,
    );

    if (lastLocation !== currentLocation) {
      setLastLocation(currentLocation);

      return;
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
    <MixedAudioControllerWrapper>
      {isInit && <MixedAudioInit handleInit={handleInit} />}
      {!isInit && (
        <MixedAudio>
          {mixedAudioSources.map((source, index) => {
            return (
              <MixedAudioBox
                key={index}
                index={index}
                source={source}
                handleDragOver={handleDragOver}
                handleCrossClick={handleCrossClick}
              />
            );
          })}
        </MixedAudio>
      )}
      <MixedPlayerWrapper>
        <MixedAudioPlayer mixedAudioSources={mixedAudioSources} />
      </MixedPlayerWrapper>
    </MixedAudioControllerWrapper>
  );
}

MixedAudioController.propTypes = {
  currentDraggedSource: PropTypes.object,
  isBoxPicked: PropTypes.bool.isRequired,
  setIsBoxPicked: PropTypes.func.isRequired,
};

export default MixedAudioController;
