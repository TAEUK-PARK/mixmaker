import { WAVE_WIDTH_MULTIFLIER } from "../../constants/audioProperties";
import { COLOR_WHITE, COLOR_BLACK } from "../../constants/colors";
import { HEIGHT } from "../../constants/drawingProperties";

const drawSoundWave = (canvasRef, visualizationData) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const { totalWidth, sampleArray } = visualizationData;

  canvas.width = totalWidth * WAVE_WIDTH_MULTIFLIER;
  canvas.height = HEIGHT;

  ctx.clearRect(0, 0, canvas.width, HEIGHT);
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillRect(0, 0, canvas.width, HEIGHT);

  ctx.beginPath();
  ctx.strokeStyle = COLOR_WHITE;
  ctx.fillStyle = COLOR_WHITE;
  ctx.lineWidth = 1;
  ctx.lineCap = "round";

  const lineLengthMultiflier = 2;
  let lineOffsetX = 0;

  sampleArray.forEach((value) => {
    const modifiedValue = value * HEIGHT * lineLengthMultiflier;
    const lineLength = modifiedValue <= 100 ? modifiedValue : 100;
    const lineOffsetY = (HEIGHT - lineLength) / 2;

    ctx.moveTo(lineOffsetX, lineOffsetY);
    ctx.lineTo(lineOffsetX, lineOffsetY + lineLength);

    lineOffsetX += WAVE_WIDTH_MULTIFLIER;
  });

  ctx.stroke();
};

export default drawSoundWave;
