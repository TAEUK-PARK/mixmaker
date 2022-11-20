import { useState } from "react";

import styled from "styled-components";

import Button from "../../_Atoms/Button";

import { COLOR_GRAY, COLOR_RED, COLOR_WHITE } from "../../../constants/colors";

const RecordButtonWrapper = styled.div`
  * {
    user-select: none;
  }
`;

function SourceRecordButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState();
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [source, setSource] = useState();

  const handleRecordClick = async () => {
    setIsRecording(!isRecording);
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const microphone = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setStream(microphone);

    const mediaRecorder = new MediaRecorder(microphone);
    mediaRecorder.start();
    setMedia(mediaRecorder);

    const source = audioCtx.createMediaStreamSource(microphone);
    setSource(source);

    await audioCtx.audioWorklet.addModule("/worklet/recorder.worklet.js");
    const recorder = new AudioWorkletNode(audioCtx, "recorder.worklet");
    setRecorder(recorder);

    source.connect(recorder).connect(audioCtx.destination);

    recorder.port.onmessage = ({ data }) => {
      console.log(data);
    };
  };

  const handleStopClick = () => {
    media.ondataavailable = (ev) => {
      console.log(URL.createObjectURL(ev.data));
      setIsRecording(!isRecording);
    };

    stream.getAudioTracks().forEach((track) => {
      track.stop;
    });

    media.stop();
    recorder.disconnect();
    source.disconnect();
  };

  return (
    <RecordButtonWrapper>
      <Button
        value={isRecording ? "Stop" : "Record"}
        fontColor={isRecording ? COLOR_RED : COLOR_WHITE}
        onClick={isRecording ? handleStopClick : handleRecordClick}
        buttonColor={COLOR_GRAY}
        small
      />
    </RecordButtonWrapper>
  );
}

export default SourceRecordButton;
