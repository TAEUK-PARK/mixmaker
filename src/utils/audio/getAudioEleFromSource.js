const getAudioEleFromSource = (source) => {
  const url = window.URL.createObjectURL(source);
  const audio = new Audio(url);

  return audio;
};

export default getAudioEleFromSource;
