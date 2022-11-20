import { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK, COLOR_GRAY } from "../../../constants/colors";

const SourceWrapper = styled.div`
  width: 100%;
  height: 100px;
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

function SourceBox({ children }) {
  const canvasRef = useRef();

  const [canvasCtx, setCanvasCtx] = useState();
  console.log(canvasCtx);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 2000;

    ctx.beginPath();
    ctx.strokeStyle = COLOR_GRAY;
    ctx.fillStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.moveTo(500, 30);
    ctx.lineTo(500, 70);

    ctx.stroke();
    // console.log(ctx);

    ctx.closePath();
    setCanvasCtx(ctx);
  }, []);

  return (
    <SourceWrapper>
      <canvas ref={canvasRef}></canvas>
    </SourceWrapper>
  );
}

SourceBox.propTypes = {
  children: PropTypes.node,
};

export default SourceBox;
