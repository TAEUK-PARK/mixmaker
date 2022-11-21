import { COLOR_WHITE, COLOR_BLACK } from "../../constants/colors";

const drawSoundWave = (canvasRef, visualizationData) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const { totalWidth, sampleArray } = visualizationData;
  const multiflier = 3;
  const height = 100;

  canvas.width = totalWidth * multiflier;
  canvas.height = height;

  ctx.clearRect(0, 0, canvas.width, height);
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillRect(0, 0, canvas.width, height);

  ctx.beginPath();
  ctx.strokeStyle = COLOR_WHITE;
  ctx.fillStyle = COLOR_WHITE;
  ctx.lineWidth = 1;
  ctx.lineCap = "round";

  const lineLengthMultiflier = 2;
  let lineOffsetX = 0;

  sampleArray.forEach((value) => {
    const modifiedValue = value * height * lineLengthMultiflier;
    const lineLength = modifiedValue <= 100 ? modifiedValue : 100;
    const lineOffsetY = (height - lineLength) / 2;

    ctx.moveTo(lineOffsetX, lineOffsetY);
    ctx.lineTo(lineOffsetX, lineOffsetY + lineLength);

    lineOffsetX += multiflier;
  });

  ctx.stroke();
};

export default drawSoundWave;
