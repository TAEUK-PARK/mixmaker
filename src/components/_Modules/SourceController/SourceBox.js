/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK } from "../../../constants/colors";

import drawSoundWave from "../../../utils/audio/drawSoundWave";
import drawSlider from "../../../utils/audio/drawSlider";

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
  return (
    <SourceWrapper>
      <canvas
        onMouseDown={(ev) => {
          console.log(ev);
        }}
        ref={ref}
      ></canvas>
    </SourceWrapper>
  );
});

SourceBox.propTypes = {};

SourceBox.displayName = "SourceBox";

export default SourceBox;
