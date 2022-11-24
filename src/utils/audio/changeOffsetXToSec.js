import { WAVE_WIDTH_MULTIFLIER } from "../../constants/audioProperties";
import { SAMPLE_PER_SEC } from "../../constants/audioProperties";

const changeOffsetXToOffset = (offsetX, sampleRate) => {
  const sec = offsetX / WAVE_WIDTH_MULTIFLIER / SAMPLE_PER_SEC;

  return sec;
};

export default changeOffsetXToOffset;
