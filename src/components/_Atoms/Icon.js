import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_BLUE, COLOR_WHITE } from "../../constants/colors";

const IconWrapper = styled.div`
  width: ${(props) => props.width || "auto"};
  min-width: ${(props) => props.width || "auto"};
  cursor: pointer;

  * {
    font-size: ${(props) => props.size || "24px"};
    color: ${(props) => props.color || COLOR_WHITE};
  }

  &:hover {
    * {
      color: ${(props) => props.hoverColor || COLOR_BLUE};
    }
  }
`;

function Icon({ children, size, color, width, onClick, hoverColor }) {
  return (
    <IconWrapper
      size={size}
      color={color}
      width={width}
      onClick={onClick}
      hoverColor={hoverColor}
    >
      {children}
    </IconWrapper>
  );
}

Icon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Icon;
