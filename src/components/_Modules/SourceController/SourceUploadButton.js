import { useRef } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../_Atoms/Button";

import getFileType from "../../../utils/getFileType";

import { COLOR_GRAY } from "../../../constants/colors";
import addNumber from "../../../utils/addNumber";

const UploadButtonWrapper = styled.div``;

function SourceUploadButton({
  numberOfSources,
  addSource,
  addVisualizationData,
  handleCurrentSourceNumber,
}) {
  const fileInput = useRef();

  const handleChange = async (ev) => {
    const sourceType = getFileType(ev.target.files[0].type);

    if (sourceType !== "audio") {
      alert("오디오 파일만 업로드 할 수 있습니다.");
      fileInput.current.value = "";
      return;
    }

    const audioSource = ev.target.files[0];

    addSource(audioSource);
    handleCurrentSourceNumber(addNumber(numberOfSources, 1));
    addVisualizationData(audioSource);
  };

  return (
    <UploadButtonWrapper>
      <label htmlFor={"input-file"}>
        <Button value={"Upload"} buttonColor={COLOR_GRAY} small />
      </label>
      <input
        ref={fileInput}
        type={"file"}
        id="input-file"
        onChange={handleChange}
        style={{ display: "none" }}
      ></input>
    </UploadButtonWrapper>
  );
}

SourceUploadButton.propTypes = {
  numberOfSources: PropTypes.number.isRequired,
  addSource: PropTypes.func.isRequired,
  addVisualizationData: PropTypes.func.isRequired,
  handleCurrentSourceNumber: PropTypes.func.isRequired,
};

export default SourceUploadButton;
