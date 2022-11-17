import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR_GRAY } from "../../constants/colors";

const IconWrapper = styled.div`
  width: ${(props) => props.width || "auto"};
  min-width: ${(props) => props.width || "auto"};

  * {
    font-size: ${(props) => props.size || "32px"};
    color: ${(props) => props.color || COLOR_GRAY};
  }
`;

function Icon({ children, size, color, width, onClick }) {
  return (
    <IconWrapper size={size} color={color} width={width} onClick={onClick}>
      {children}
    </IconWrapper>
  );
}

Icon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Icon;
