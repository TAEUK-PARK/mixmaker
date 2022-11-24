import changeOffsetXToOffset from "./changeOffsetXToOffset";

const trimAudioBuffer = (audioBuffer, audioSection) => {
  const { anchor, head } = audioSection;

  if (anchor === head) {
    return audioBuffer;
  }

  const { numberOfChannels, sampleRate } = audioBuffer;
  const from = changeOffsetXToOffset(Math.min(anchor, head), sampleRate);
  const to = changeOffsetXToOffset(Math.max(anchor, head), sampleRate);
  const numberOfSamples = to - from;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
