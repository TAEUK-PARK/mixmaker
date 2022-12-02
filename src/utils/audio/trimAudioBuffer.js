import changeOffsetXToOffset from "./changeOffsetXToOffset";
import { AudioContext } from "standardized-audio-context-mock";

const trimAudioBuffer = (audioBuffer, audioSection) => {
  const { anchor, head } = audioSection;

  if (anchor === head) {
    return audioBuffer;
  }

  const { numberOfChannels, sampleRate } = audioBuffer;
  const from = changeOffsetXToOffset(Math.min(anchor, head), sampleRate);
  const to = changeOffsetXToOffset(Math.max(anchor, head), sampleRate);
  const numberOfSamples = to - from;

  let audioCtx;

  if (typeof window !== "undefined") {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } else {
    audioCtx = new AudioContext();
  }

  const newAudioBuffer = audioCtx.createBuffer(
    numberOfChannels,
    numberOfSamples,
    sampleRate,
  );
  const anotherArray = new Float32Array(numberOfSamples);

  for (let channel = 0; channel < numberOfChannels; channel++) {
    audioBuffer.copyFromChannel(anotherArray, channel, from);
    newAudioBuffer.copyToChannel(anotherArray, channel, 0);
  }

  return newAudioBuffer;
};

export default trimAudioBuffer;
