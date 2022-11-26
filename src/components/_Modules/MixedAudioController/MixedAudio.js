import styled from "styled-components";
import PropTypes from "prop-types";

const ScrollDiv = styled.div`
  width: 90%;
  height: 150px;

  overflow-y: hidden;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 6px solid transparent;
  }
`;

const MixedAudioWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 150px;
`;

function MixedAudio({ children, handleAddLast }) {
  return (
    <ScrollDiv
      onDrop={handleAddLast}
      onDragEnter={(ev) => {
        ev.preventDefault();
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
    >
      <MixedAudioWrapper>{children}</MixedAudioWrapper>
    </ScrollDiv>
  );
}

MixedAudio.propTypes = {
  children: PropTypes.node,
  handleAddLast: PropTypes.func.isRequired,
};

export default MixedAudio;
