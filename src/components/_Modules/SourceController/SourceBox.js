import styled from "styled-components";
import PropTypes from "prop-types";

const SourceWrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: gray;
`;

function SourceBox({ children }) {
  return <SourceWrapper>{children}</SourceWrapper>;
}

SourceBox.propTypes = {
  children: PropTypes.node,
};

export default SourceBox;
