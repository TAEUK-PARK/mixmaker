import getIndexFromLength from "../getIndexFromLength";
import changeBlobToAudioBuffer from "./changeBlobToAudioBuffer";

const getMergedAudio = async (audioBlobsArray) => {
  const audioBuffersArray = [];

  for (let i = 0; i < audioBlobsArray.length; i++) {
    audioBuffersArray.push(await changeBlobToAudioBuffer(audioBlobsArray[i]));
  }

  const numberOfChannels = 2;
  const { sampleRate } = audioBuffersArray[0];

  const channelData = [];
  let totalLength = 0;

  const setChannelDataAndLength = (index) => {
    for (let i = 0; i < numberOfChannels; i++) {
      const realNumberOfChannels = audioBuffersArray[index].numberOfChannels;

      let data;

      if (realNumberOfChannels < numberOfChannels) {
        data = audioBuffersArray[index].getChannelData(0);
      } else {
        data = audioBuffersArray[index].getChannelData(i);
      }

      channelData[i]
        ? (channelData[i] = [...channelData[i], ...data])
        : channelData.push(data);
      totalLength += data.length;
    }

    if (index === getIndexFromLength(audioBuffersArray.length)) return;

    setChannelDataAndLength(index + 1);
  };

  setChannelDataAndLength(0);

  const channelLength = channelData[0].length;
  const interleaved = new Float32Array(totalLength);

  for (
    let src = 0, dst = 0;
    src < channelLength;
    src++, dst += numberOfChannels
  ) {
    for (let i = 0; i < numberOfChannels; i++) {
      interleaved[dst + i] = channelData[i][src];
    }
  }

  const wavBytes = getWavBytes(interleaved.buffer, {
    isFloat: true,
    numChannels: 2,
    sampleRate,
  });

  const wav = new Blob([wavBytes], { type: "audio/wav" });

  return wav;
};

const getWavBytes = (buffer, options) => {
  const type = options.isFloat ? Float32Array : Uint16Array;
  const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT;

  const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }));
  const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);

  wavBytes.set(headerBytes, 0);
  wavBytes.set(new Uint8Array(buffer), headerBytes.length);

  return wavBytes;
};

const getWavHeader = (options) => {
  const numFrames = options.numFrames;
  const numChannels = options.numChannels || 2;
  const sampleRate = options.sampleRate || 44100;
  const bytesPerSample = options.isFloat ? 4 : 2;
  const format = options.isFloat ? 3 : 1;

  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numFrames * blockAlign;

  const buffer = new ArrayBuffer(44);
  const dv = new DataView(buffer);

  let p = 0;

  const writeString = (s) => {
    for (let i = 0; i < s.length; i++) {
      dv.setUint8(p + i, s.charCodeAt(i));
    }
    p += s.length;
  };

  const writeUint32 = (d) => {
    dv.setUint32(p, d, true);
    p += 4;
  };

  const writeUint16 = (d) => {
    dv.setUint16(p, d, true);
    p += 2;
  };

  writeString("RIFF"); // ChunkID
  writeUint32(dataSize + 36); // ChunkSize
  writeString("WAVE"); // Format
  writeString("fmt "); // Subchunk1ID
  writeUint32(16); // Subchunk1Size
  writeUint16(format); // AudioFormat
  writeUint16(numChannels); // NumChannels
  writeUint32(sampleRate); // SampleRate
  writeUint32(byteRate); // ByteRate
  writeUint16(blockAlign); // BlockAlign
  writeUint16(bytesPerSample * 8); // BitsPerSample
  writeString("data"); // Subchunk2ID
  writeUint32(dataSize); // Subchunk2Size

  return new Uint8Array(buffer);
};

export default getMergedAudio;
