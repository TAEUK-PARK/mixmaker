import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLACK } from "../../constants/colors";

const TextWrapper = styled.span`
  font-size: ${(props) => props.size || "38px"};
  color: ${(props) => props.color || COLOR_BLACK};
  user-select: ${(props) => props.selectable || "auto"};
  width: ${(props) => props.width || "auto"};
  min-width: ${(props) => props.width || "auto"};
  white-space: nowrap;
  text-align: center;

  text-overflow: ellipsis;
`;

function Text({ children, size, color, width, selectable, onClick }) {
  return (
    <TextWrapper
      size={size}
      color={color}
      width={width}
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
  width: PropTypes.string,
  selectable: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Text;
