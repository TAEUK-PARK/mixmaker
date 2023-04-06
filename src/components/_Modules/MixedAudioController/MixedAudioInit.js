import styled from "styled-components";
import PropTypes from "prop-types";

import Text from "../../_Atoms/Text";

import {
  COLOR_BLACK,
  COLOR_LIGHT_GRAY,
  COLOR_WHITE,
} from "../../../constants/colors";

const InitEleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 1px;
  border-color: ${COLOR_LIGHT_GRAY};
  border-style: solid;
  border-radius: 15px;
  background-color: ${COLOR_BLACK};

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
      <Text size={"16px"} weight={200} color={COLOR_WHITE}>
        이곳에 오디오를 드래그 해보세요!
      </Text>
    </InitEleWrapper>
  );
}

MixedAudioInit.propTypes = {
  handleInit: PropTypes.func,
};

export default MixedAudioInit;
