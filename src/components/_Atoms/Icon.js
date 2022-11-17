import styled from "styled-components";
import PropTypes from "prop-types";

const IconWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  * {
    font-size: ${(props) => props.size || "32px"};
    color: ${(props) => props.color || "#989898"};
  }
`;

function Icon({ children, size, color, onClick }) {
  return (
    <IconWrapper size={size} color={color} onClick={onClick}>
      {children}
    </IconWrapper>
  );
}

Icon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Icon;
