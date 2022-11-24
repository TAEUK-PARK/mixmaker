import getAudioEleFromSource from "./getAudioEleFromSource";

const handlePlaying = (blob, isPlaying, audioElement, handleAudioEnded) => {
  if (isPlaying) {
    if (audioElement) {
      audioElement.play();
      audioElement.onended = handleAudioEnded;
      return;
    }

    const audio = getAudioEleFromSource(blob);
    audio.play();
    audio.onended = handleAudioEnded;

    return audio;
  }

  if (!isPlaying && audioElement) {
    audioElement.pause();
  }
};

export default handlePlaying;
