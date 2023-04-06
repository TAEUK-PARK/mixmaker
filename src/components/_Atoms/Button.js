import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import {
  COLOR_BLUE,
  COLOR_GRAY_HIGHLIGHT,
  COLOR_LIGHT_GRAY,
  COLOR_WHITE,
} from "../../constants/colors";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  background: ${(props) => props.buttonColor || COLOR_BLUE};
  border-radius: 6px;
  border-color: ${(props) => props.borderColor || COLOR_LIGHT_GRAY};
  border-style: solid;
  border-width: 0.2px;
  cursor: pointer;

  font-size: ${(props) => props.fontSize || "25px"};
  color: ${(props) => props.fontColor || COLOR_WHITE};

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
        width: 90px;
        height: 30px;

        font-size: 14px;
      `;
    }
  }}

  &:hover {
    background-color: ${COLOR_GRAY_HIGHLIGHT};
    border-color: ${COLOR_WHITE};
  }
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
  borderColor: PropTypes.string,
};

export default Button;
