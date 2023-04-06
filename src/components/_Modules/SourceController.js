import { useState, useRef } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import SourceAddButtons from "./SourceController/SourceAddButtons";
import SourceToolBar from "./SourceController/SourceToolBar";
import SourceBox from "./SourceController/SourceBox";

import getIndexFromLength from "../../utils/getIndexFromLength";

import { COLOR_BLACK } from "../../constants/colors";
import getRawData from "../../utils/audio/getRawData";
import getSample from "../../utils/audio/getSample";
import SourcePlayer from "./SourceController/SourcePlayer";

const SourceControllerWrapper = styled.div`
  height: 200px;
  padding: 20px;
  background-color: ${COLOR_BLACK};
`;

const SourcePlayerWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

function SourceController({
  sources,
  addSource,
  addTrimmedAudio,
  numberOfSources,
  currentSourceNumber,
  handleCurrentSourceNumber,
}) {
  const canvasRef = useRef();
  const wrapperRef = useRef();

  const [visualizationData, setVisualizationData] = useState([]);
  const [audioSection, setAudioSection] = useState({
    anchor: 0,
    head: 0,
  });

  const addVisualizationData = async (source) => {
    const sampleData = getSample(await getRawData(source));

    setVisualizationData((prev) => {
      const result = prev.slice();
      result.push(sampleData);

      return result;
    });
  };

  return (
    <SourceControllerWrapper>
      <SourceAddButtons
        numberOfSources={numberOfSources}
        addSource={addSource}
        addVisualizationData={addVisualizationData}
        handleCurrentSourceNumber={handleCurrentSourceNumber}
      />
      <SourceToolBar
        numberOfSources={numberOfSources}
        currentSourceNumber={currentSourceNumber}
        handleCurrentSourceNumber={handleCurrentSourceNumber}
      />
      <SourceBox
        setAudioSection={setAudioSection}
        ref={{ canvasRef, wrapperRef }}
      />
      <SourcePlayerWrapper>
        <SourcePlayer
          visualizationData={
            visualizationData[getIndexFromLength(currentSourceNumber)]
          }
          source={sources[getIndexFromLength(currentSourceNumber)]}
          addTrimmedAudio={addTrimmedAudio}
          audioSection={audioSection}
          setAudioSection={setAudioSection}
          canvasRef={canvasRef}
          wrapperRef={wrapperRef}
        />
      </SourcePlayerWrapper>
    </SourceControllerWrapper>
  );
}

SourceController.propTypes = {
  sources: PropTypes.array.isRequired,
  addSource: PropTypes.func.isRequired,
  addTrimmedAudio: PropTypes.func.isRequired,
  numberOfSources: PropTypes.number.isRequired,
  currentSourceNumber: PropTypes.number,
  handleCurrentSourceNumber: PropTypes.func.isRequired,
};

export default SourceController;
