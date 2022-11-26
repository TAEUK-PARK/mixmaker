/* eslint-disable no-unused-vars */
import { forwardRef, useState, useCallback } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK } from "../../../constants/colors";

import throttle from "../../../utils/throttle";
import getCurrentMouseX from "../../../utils/audio/getCurrentMouseX";

const SourceWrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: #e3f0ff;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;

  overflow-y: hidden;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 6px solid transparent;
  }
`;

const SourceBox = forwardRef(({ setAudioSection }, ref) => {
  const { canvasRef, wrapperRef } = ref;
  const [isDragging, setIsDragging] = useState(false);
  const [prevMouseX, setPrevMouseX] = useState(NaN);
  const [scrollInterval, setScrollInterval] = useState();

  const handleDrag = (ev, prevMouseX, scrollInterval, setAudioSection) => {
    const { scrollLeft, clientWidth } = wrapperRef.current;
    const { pageX } = ev;

    const currentMouseX = getCurrentMouseX(ev);
    const currentCanvasWidth = clientWidth + scrollLeft;

    const restSpaceRight = currentCanvasWidth - currentMouseX;
    const restSpaceLeft = currentMouseX - scrollLeft;

    setPrevMouseX(pageX);

    const getMovingDirection = () => {
      if (prevMouseX === pageX) return "stop";

      return prevMouseX < pageX ? "right" : "left";
    };

    const movingDirection = getMovingDirection();

    clearInterval(scrollInterval);

    const interval = setInterval(() => {
      if (restSpaceRight <= 150 && movingDirection === "right") {
        const modifier = 1500 / restSpaceRight;
        wrapperRef.current.scrollLeft =
          wrapperRef.current.scrollLeft + modifier;

        setAudioSection((prev) => {
          return { ...prev, head: getCurrentMouseX(ev) };
        });
      }

      if (restSpaceLeft <= 150 && movingDirection === "left") {
        const modifier = 1500 / restSpaceLeft;
        wrapperRef.current.scrollLeft =
          wrapperRef.current.scrollLeft - modifier;

        setAudioSection((prev) => {
          return { ...prev, head: getCurrentMouseX(ev) };
        });
      }
    }, 50);

    setScrollInterval(interval);
  };

  const throttledHandleDrag = useCallback(throttle(handleDrag, 50), []);

  return (
    <SourceWrapper ref={wrapperRef}>
      <canvas
        onMouseDown={(ev) => {
          if (!isDragging) {
            setIsDragging(true);
            setAudioSection((prev) => {
              return {
                ...prev,
                anchor: getCurrentMouseX(ev),
                head: getCurrentMouseX(ev),
              };
            });
          }
        }}
        onMouseMove={(ev) => {
          if (isDragging) {
            setAudioSection((prev) => {
              return { ...prev, head: getCurrentMouseX(ev) };
            });
            throttledHandleDrag(
              ev,
              prevMouseX,
              scrollInterval,
              setAudioSection,
            );
          }
        }}
        onMouseUp={(ev) => {
          clearInterval(scrollInterval);
          if (isDragging) {
            setAudioSection((prev) => {
              return { ...prev, head: getCurrentMouseX(ev) };
            });
            setIsDragging(false);
          }
        }}
        ref={canvasRef}
      ></canvas>
    </SourceWrapper>
  );
});

SourceBox.propTypes = {
  setAudioSection: PropTypes.func.isRequired,
};

SourceBox.displayName = "SourceBox";

export default SourceBox;
