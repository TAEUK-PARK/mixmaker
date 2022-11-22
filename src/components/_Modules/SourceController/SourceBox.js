/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useState, useRef, useCallback } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK } from "../../../constants/colors";

import drawSoundWave from "../../../utils/audio/drawSoundWave";
import drawSlider from "../../../utils/audio/drawSlider";

import throttle from "../../../utils/throttle";

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

const SourceBox = forwardRef((props, ref) => {
  const wrapperRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [prevMouseX, setPrevMouseX] = useState(NaN);
  const [scrollInterval, setScrollInterval] = useState();

  const throttledHandleDrag = useCallback(
    throttle((ev, bound, prevMouseX, scrollInterval) => {
      const { scrollLeft, clientWidth } = wrapperRef.current;
      const { clientX, pageX } = ev;
      const { left } = bound;

      const currentMouseX = clientX - left;
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
        }

        if (restSpaceLeft <= 150 && movingDirection === "left") {
          const modifier = 1500 / restSpaceLeft;
          wrapperRef.current.scrollLeft =
            wrapperRef.current.scrollLeft - modifier;
        }
      }, 50);

      setScrollInterval(interval);
    }, 50),
    [],
  );

  return (
    <SourceWrapper ref={wrapperRef}>
      <canvas
        onMouseDown={(ev) => {
          if (!isDragging) {
            setIsDragging(true);
            console.log("드래그 시작", wrapperRef.current.clientWidth);
          }
        }}
        onMouseMove={(ev) => {
          if (isDragging) {
            const bound = ev.target.getBoundingClientRect();
            throttledHandleDrag(ev, bound, prevMouseX, scrollInterval);
          }
        }}
        onMouseUp={(ev) => {
          if (isDragging) {
            setIsDragging(false);
            console.log("드래그 종료");
          }
        }}
        ref={ref}
      ></canvas>
    </SourceWrapper>
  );
});

SourceBox.propTypes = {};

SourceBox.displayName = "SourceBox";

export default SourceBox;
