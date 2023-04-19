import { useState, useEffect, useRef } from "react";

import Modal from "../../_Atoms/Modal";

const InfoModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(true);

  const onModalClose = () => {
    setIsModalOpened(false);
  };

  const iframeRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const { clientWidth } = iframeRef.current.parentNode;
      const aspectRatio = 9 / 16;
      iframeRef.current.style.height = `${clientWidth * aspectRatio}px`;
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Modal isOpen={isModalOpened} onClose={onModalClose}>
      <div style={{ position: "relative", width: "100%", height: 0 }}>
        <iframe
          src="https://www.youtube.com/embed/JIVbs874f_M"
          ref={iframeRef}
          title="youtube"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        ></iframe>
      </div>
    </Modal>
  );
};

export default InfoModal;
