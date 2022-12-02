/**
 * @jest-environment jsdom
 */

import { fireEvent, waitFor, render } from "@testing-library/react";
import SourceUploadButton from "../../components/_Modules/SourceController/SourceUploadButton";

describe("test audio upload", () => {
  let file;

  it("add audio data when correct audio file uploaded", async () => {
    file = new File(["audiofile"], "sample.mp3", { type: "audio/mp3" });

    const numberOfSources = 5;
    const addSource = jest.fn();
    const addVisualizationData = jest.fn();
    const handleCurrentSourceNumber = jest.fn();

    const initialProps = {
      numberOfSources,
      addSource,
      addVisualizationData,
      handleCurrentSourceNumber,
    };

    const { getByTestId } = render(<SourceUploadButton {...initialProps} />);
    const uploader = getByTestId("audio-uploader");

    await waitFor(() => {
      fireEvent.change(uploader, { target: { files: [file] } });
    });

    expect(addSource).toBeCalledTimes(1);
    expect(addVisualizationData).toBeCalledTimes(1);
    expect(handleCurrentSourceNumber).toBeCalledTimes(1);
  });

  it("don't add data when invalid file(not audio) uploaded", async () => {
    file = new File(["not audio file"], "sample.png", { type: "image/png" });

    const numberOfSources = 5;
    const addSource = jest.fn();
    const addVisualizationData = jest.fn();
    const handleCurrentSourceNumber = jest.fn();

    const initialProps = {
      numberOfSources,
      addSource,
      addVisualizationData,
      handleCurrentSourceNumber,
    };

    const { getByTestId } = render(<SourceUploadButton {...initialProps} />);
    const uploader = getByTestId("audio-uploader");

    await waitFor(() => {
      fireEvent.change(uploader, { target: { files: [file] } });
    });

    expect(addSource).toBeCalledTimes(0);
    expect(addVisualizationData).toBeCalledTimes(0);
    expect(handleCurrentSourceNumber).toBeCalledTimes(0);
  });
});
