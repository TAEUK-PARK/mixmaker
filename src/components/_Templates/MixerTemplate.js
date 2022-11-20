import { useState } from "react";

import styled from "styled-components";

import SourceController from "../_Modules/SourceController";
import CuttedAudioController from "../_Modules/CuttedAudioController";
import MixedAuidoController from "../_Modules/MixedAuidoController";

const MixerWrapper = styled.div``;

function MixerTemplate() {
  const [sources, setSources] = useState([]);
  const [currentSourceNumber, setCurrentSourceNumber] = useState(0);

  const addSource = (source) => {
    setSources((prev) => {
      const result = prev.slice();
      result.push(source);

      return result;
    });
  };

  return (
    <MixerWrapper>
      <SourceController
        sources={sources}
        addSource={addSource}
        numberOfSources={sources.length}
        currentSourceNumber={currentSourceNumber}
        handleCurrentSourceNumber={setCurrentSourceNumber}
      />
      <CuttedAudioController />
      <MixedAuidoController />
    </MixerWrapper>
  );
}

export default MixerTemplate;
