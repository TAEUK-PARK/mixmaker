import getAverage from "../getAverage";
import getIndexFromLength from "../getIndexFromLength";

const getSample = (audioData) => {
  const { rawData, duration, sampleRate } = audioData;
  const samplePerSec = 24;
  const totalWidth = duration * samplePerSec;
  const samplingSize = Math.floor(sampleRate / samplePerSec);

  const sampleArray = [];
  let sampleFilter = samplingSize;
  let currentSum = 0;

  rawData.forEach((value, index, array) => {
    if (sampleFilter === 0) {
      sampleFilter = samplingSize;
      sampleArray.push(getAverage(currentSum, samplingSize));
      currentSum = 0;
    }

    currentSum += Math.abs(value);
    sampleFilter -= 1;

    if (index === getIndexFromLength(array.length)) {
      sampleArray.push(getAverage(currentSum, samplingSize - sampleFilter));
    }
  });
  return { totalWidth, sampleArray };
};

export default getSample;
