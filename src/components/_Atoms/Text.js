import styled from "styled-components";
import PropTypes from "prop-types";

const TextWrapper = styled.span`
  font-size: ${(props) => props.size || "38px"};
  color: ${(props) => props.color || "black"};
  clear: both;
  float: left;
  user-select: ${(props) => props.selectable || "auto"};
`;

function Text({ children, size, color, selectable, onClick }) {
  return (
    <TextWrapper
      size={size}
      color={color}
      selectable={selectable}
      onClick={onClick}
    >
      {children}
    </TextWrapper>
  );
}

Text.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  selectable: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Text;
