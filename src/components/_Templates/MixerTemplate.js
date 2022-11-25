import { useState } from "react";

import styled from "styled-components";

import SourceController from "../_Modules/SourceController";
import CuttedAudioController from "../_Modules/CuttedAudioController";
import MixedAuidoController from "../_Modules/MixedAuidoController";

const MixerWrapper = styled.div``;

function MixerTemplate() {
  const [sources, setSources] = useState([]);
  const [currentSourceNumber, setCurrentSourceNumber] = useState(0);
  const [trimmedAudios, setTrimmedAudios] = useState([]);

  const addSource = (source) => {
    setSources((prev) => {
      const result = prev.slice();
      result.push(source);

      return result;
    });
  };

  const addTrimmedAudio = (trimmedAudio) => {
    setTrimmedAudios((prev) => {
      const result = prev.slice();
      result.push(trimmedAudio);

      return result;
    });
  };

  const deleteTrimmedAudio = (index) => {
    return () => {
      setTrimmedAudios((prev) => {
        const result = prev.slice();
        result.splice(index, 1);

        return result;
      });
    };
  };

  return (
    <MixerWrapper>
      <SourceController
        sources={sources}
        addSource={addSource}
        addTrimmedAudio={addTrimmedAudio}
        numberOfSources={sources.length}
        currentSourceNumber={currentSourceNumber}
        handleCurrentSourceNumber={setCurrentSourceNumber}
      />
      <CuttedAudioController
        trimmedAudios={trimmedAudios}
        deleteTrimmedAudio={deleteTrimmedAudio}
      />
      <MixedAuidoController />
    </MixerWrapper>
  );
}

export default MixerTemplate;
