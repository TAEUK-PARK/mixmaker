import { WAVE_WIDTH_MULTIFLIER } from "../../constants/audioProperties";
import { COLOR_RED } from "../../constants/colors";
import {
  HEIGHT,
  LINE_LENGTH_MULTIFLIER,
} from "../../constants/drawingProperties";

const drawSection = (canvasRef, audioSection, visualizationData) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const { sampleArray } = visualizationData;
  const { anchor, head } = audioSection;

  ctx.beginPath();
  ctx.strokeStyle = COLOR_RED;
  ctx.fillStyle = COLOR_RED;

  const from = anchor > head ? head : anchor;
  const to = anchor <= head ? head : anchor;

  const indexTo = Math.floor(to / WAVE_WIDTH_MULTIFLIER);
  const indexFrom = Math.floor(from / WAVE_WIDTH_MULTIFLIER);

  const drawBars = (index, indexTo, sampleArray, ctx) => {
    if (index >= indexTo) return;

    const modifiedValue = sampleArray[index] * HEIGHT * LINE_LENGTH_MULTIFLIER;
    const lineLength = modifiedValue <= 100 ? modifiedValue : 100;
    const lineOffsetX = index * WAVE_WIDTH_MULTIFLIER;
    const lineOffsetY = (HEIGHT - lineLength) / 2;

    ctx.moveTo(lineOffsetX, lineOffsetY);
    ctx.lineTo(lineOffsetX, lineOffsetY + lineLength);

    return drawBars(index + 1, indexTo, sampleArray, ctx);
  };

  drawBars(indexFrom, indexTo, sampleArray, ctx);
  ctx.stroke();
};

export default drawSection;
