import { useEffect, useState } from "react";

import styled from "styled-components";

import SourceController from "../_Modules/SourceController";
import CuttedAudioController from "../_Modules/CuttedAudioController";
import MixedAuidoController from "../_Modules/MixedAuidoController";

const MixerWrapper = styled.div``;

function MixerTemplate() {
  const [sources, setSources] = useState([]);

  const addSource = (source) => {
    console.log("addSource");
    setSources((prev) => {
      const result = prev.slice();
      result.push(source);

      return result;
    });
  };

  useEffect(() => {
    console.log(sources);
  }, [sources]);

  return (
    <MixerWrapper>
      <SourceController
        sources={sources}
        addSource={addSource}
        numberOfSources={sources.length}
      />
      <CuttedAudioController />
      <MixedAuidoController />
    </MixerWrapper>
  );
}

export default MixerTemplate;
