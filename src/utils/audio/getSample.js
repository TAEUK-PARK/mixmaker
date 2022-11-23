import { SAMPLE_PER_SEC } from "../../constants/audioProperties";
import getAverage from "../getAverage";
import getIndexFromLength from "../getIndexFromLength";

const getSample = (audioData) => {
  const { rawData, duration, sampleRate } = audioData;
  const totalWidth = duration * SAMPLE_PER_SEC;
  const samplingSize = Math.floor(sampleRate / SAMPLE_PER_SEC);

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
