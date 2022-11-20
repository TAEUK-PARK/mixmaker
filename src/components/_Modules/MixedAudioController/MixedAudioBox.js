import styled from "styled-components";
import PropTypes from "prop-types";

const MixedAudioWrapper = styled.div`
  width: 100%;
  height: 100px;
`;

function MixedAudioBox({ children }) {
  return <MixedAudioWrapper>{children}</MixedAudioWrapper>;
}

MixedAudioBox.propTypes = {
  children: PropTypes.node,
};

export default MixedAudioBox;
