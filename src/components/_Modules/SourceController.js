import { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import SourceUploadButtons from "./SourceController/SourceAddButtons";
import SourceToolBar from "./SourceController/SourceToolBar";
import SourceBox from "./SourceController/SourceBox";

import { COLOR_BLACK } from "../../constants/colors";

const SourceControllerWrapper = styled.div`
  padding: 20px;
  margin: 10px;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
`;

function SourceController({ addSource, numberOfSources }) {
  const [currentSourceNumber, setCurrentSourceNumber] = useState(0);

  return (
    <SourceControllerWrapper>
      <SourceUploadButtons addSource={addSource} />
      <SourceToolBar
        numberOfSources={numberOfSources}
        currentSourceNumber={currentSourceNumber}
        handleClick={setCurrentSourceNumber}
      />
      <SourceBox />
    </SourceControllerWrapper>
  );
}

SourceController.propTypes = {
  addSource: PropTypes.func.isRequired,
  numberOfSources: PropTypes.number.isRequired,
};

export default SourceController;
