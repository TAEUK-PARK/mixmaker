import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
  background: ${(props) => props.buttonColor || "#0f57e3"};
  width: ${(props) => props.width || "150px"};
  height: ${(props) => props.height || "60px"};
  border-radius: 50px;

  font-size: ${(props) => props.fontSize || "25px"};
  color: ${(props) => props.fontColor || "white"};

  ${(props) => {
    if (props.big) {
      return css`
        width: 150px;
        height: 55.5px;

        font-size: 25px;
      `;
    }

    if (props.small) {
      return css`
        width: 120px;
        height: 44.5px;

        font-size: 20px;
      `;
    }
  }}
`;

function Button({ value, ...props }) {
  return <ButtonWrapper {...props}>{value || ""}</ButtonWrapper>;
}

Button.propTypes = {
  value: PropTypes.string,
  buttonColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  big: PropTypes.bool,
  small: PropTypes.bool,
};

export default Button;
