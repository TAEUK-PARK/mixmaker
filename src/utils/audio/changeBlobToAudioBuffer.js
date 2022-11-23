const changeBlobToAudioBuffer = async (audioBlob) => {
  if (!audioBlob) return undefined;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  return audioBuffer;
};

export default changeBlobToAudioBuffer;
