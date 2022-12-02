import trimAudioBuffer from "../../utils/audio/trimAudioBuffer";

import { AudioBuffer } from "standardized-audio-context-mock";
import { SAMPLE_PER_SEC } from "../../constants/audioProperties";

describe("trim Audiobuffer correctly", () => {
  it("return trimmed audiobuffer when anchor and head are different", () => {
    const audioSection = { anchor: 0, head: 18 };

    const numSeconds = 10;
    const sampleRate = 48000;
    const numberOfChannels = 2;
    const length = numSeconds * sampleRate;
    const audioBuffer = new AudioBuffer({
      length,
      sampleRate,
      numberOfChannels,
    });

    const trimmedSection =
      Math.max(audioSection.anchor, audioSection.head) -
      Math.min(audioSection.anchor, audioSection.head);

    const trimmedSec = trimmedSection / 3 / SAMPLE_PER_SEC;

    expect(trimAudioBuffer(audioBuffer, audioSection).length).toBe(
      trimmedSec * sampleRate,
    );
  });

  it("return input audiobuffer when anchor and head are same", () => {
    const audioSection = { anchor: 18, head: 18 };

    const numSeconds = 10;
    const sampleRate = 48000;
    const numberOfChannels = 2;
    const length = numSeconds * sampleRate;
    const audioBuffer = new AudioBuffer({
      length,
      sampleRate,
      numberOfChannels,
    });

    expect(trimAudioBuffer(audioBuffer, audioSection)).toEqual(audioBuffer);
  });
});
