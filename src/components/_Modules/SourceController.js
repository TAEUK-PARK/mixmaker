import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import SourceAddButtons from "./SourceController/SourceAddButtons";
import SourceToolBar from "./SourceController/SourceToolBar";
import SourceBox from "./SourceController/SourceBox";

import getIndexFromLength from "../../utils/getIndexFromLength";

import { COLOR_BLACK } from "../../constants/colors";
import getRawData from "../../utils/audio/getRawData";
import getSample from "../../utils/audio/getSample";

const SourceControllerWrapper = styled.div`
  padding: 20px;
  margin: 10px;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
`;

function SourceController({
  sources,
  addSource,
  numberOfSources,
  currentSourceNumber,
  handleCurrentSourceNumber,
}) {
  const [visualizationData, setVisualizationData] = useState([]);

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
        visualizationData={
          visualizationData[getIndexFromLength(currentSourceNumber)]
        }
        source={sources[getIndexFromLength(currentSourceNumber)]}
      />
    </SourceControllerWrapper>
  );
}

SourceController.propTypes = {
  sources: PropTypes.array.isRequired,
  addSource: PropTypes.func.isRequired,
  numberOfSources: PropTypes.number.isRequired,
  currentSourceNumber: PropTypes.number,
  handleCurrentSourceNumber: PropTypes.func.isRequired,
};

export default SourceController;
