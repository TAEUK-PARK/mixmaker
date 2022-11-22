import { COLOR_RED } from "../../constants/colors";
import getIndexFromLength from "../getIndexFromLength";

const drawSlider = (
  canvasRef,
  wrapperRef,
  visualizationData,
  setIsAudioChanged,
  currentTime,
) => {
  console.log(currentTime);
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const { sampleArray } = visualizationData;
  const multiflier = 3;
  const height = 100;

  ctx.beginPath();
  ctx.strokeStyle = COLOR_RED;
  ctx.fillStyle = COLOR_RED;

  const currentSample = Math.floor(currentTime * 24);
  const lineLengthMultiflier = 2;

  const getCurrentIndex = (currentSample) => {
    if (currentSample === 0) return { lineOffsetX: 0, index: 0 };

    const getLineOffsetXAndIndex = (lineOffsetX, index) => {
      if (index === currentSample) return { lineOffsetX, index };

      const modifiedValue = sampleArray[index] * height * lineLengthMultiflier;
      const lineLength = modifiedValue <= 100 ? modifiedValue : 100;
      const lineOffsetY = (height - lineLength) / 2;

      ctx.moveTo(lineOffsetX, lineOffsetY);
      ctx.lineTo(lineOffsetX, lineOffsetY + lineLength);

      lineOffsetX += multiflier;
      index += 1;
      ctx.stroke();

      return getLineOffsetXAndIndex(lineOffsetX, index);
    };

    const startLineOffsetX = 0;
    const startIndex = 0;

    return getLineOffsetXAndIndex(startLineOffsetX, startIndex);
  };

  let { lineOffsetX, index } = getCurrentIndex(currentSample);
  wrapperRef.current.scrollLeft = lineOffsetX - 100;

  const drawInterval = setInterval(() => {
    if (index === getIndexFromLength(sampleArray.length)) {
      setIsAudioChanged(true);
      clearInterval(drawInterval);
    }

    const modifiedValue = sampleArray[index] * height * lineLengthMultiflier;
    const lineLength = modifiedValue <= 100 ? modifiedValue : 100;
    const lineOffsetY = (height - lineLength) / 2;

    ctx.moveTo(lineOffsetX, lineOffsetY);
    ctx.lineTo(lineOffsetX, lineOffsetY + lineLength);

    lineOffsetX += multiflier;
    index += 1;
    ctx.stroke();
  }, 1000 / 24);

  return drawInterval;
};

export default drawSlider;
