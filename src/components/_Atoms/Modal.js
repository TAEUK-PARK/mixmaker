import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLOR_WHITE, COLOR_GRAY_HIGHLIGHT } from "../../constants/colors";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 50%;
  min-height: 50%;
  max-width: 70%;
  max-height: 50%;
  padding: 20px;
  background-color: ${COLOR_WHITE};
  border-radius: 12px;
  z-index: 1000;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR_GRAY_HIGHLIGHT};
    border-radius: 10px;
    background-clip: padding-box;
    border: 6px solid transparent;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </Overlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;
