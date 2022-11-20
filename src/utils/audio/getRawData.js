const getRawData = async (source) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await source.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const rawData = audioBuffer.getChannelData(0);
  const { duration, sampleRate } = audioBuffer;

  return { rawData, duration, sampleRate };
};

export default getRawData;
