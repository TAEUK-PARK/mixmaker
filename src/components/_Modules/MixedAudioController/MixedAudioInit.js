import styled from "styled-components";
import PropTypes from "prop-types";

import Text from "../../_Atoms/Text";

import { COLOR_BLACK } from "../../../constants/colors";

const InitEleWrapper = styled.div`
  width: 90%;
  min-width: 820px;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 1px;
  border-color: ${COLOR_BLACK};
  border-style: solid;
  background-color: white;

  * {
    text-align: center;
  }
`;

function MixedAudioInit({ handleInit }) {
  return (
    <InitEleWrapper
      onDrop={handleInit}
      onDragEnter={(ev) => {
        ev.preventDefault();
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
    >
      <Text size={"20px"}>이곳에 오디오를 드래그 해보세요!</Text>
    </InitEleWrapper>
  );
}

MixedAudioInit.propTypes = {
  handleInit: PropTypes.func,
};

export default MixedAudioInit;
