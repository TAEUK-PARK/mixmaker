/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render } from "@testing-library/react";

import SourceSelector from "../../components/_Modules/SourceController/SourceSelector";

describe("correct handle source selector", () => {
  it("prevent click right when current source number is not less than number of sources", () => {
    const handleCurrentSourceNumber = jest.fn();
    const numberOfSources = 5;
    const currentSourceNumber = 5;

    const initialProps = {
      handleCurrentSourceNumber,
      numberOfSources,
      currentSourceNumber,
    };

    const { getByTestId } = render(<SourceSelector {...initialProps} />);

    const target = getByTestId("moveSelectionRight");

    fireEvent.click(target);

    expect(handleCurrentSourceNumber).toBeCalledTimes(0);
  });

  it("click right when current source number is less than number of sources", () => {
    const handleCurrentSourceNumber = jest.fn();
    const numberOfSources = 5;
    const currentSourceNumber = 2;

    const initialProps = {
      handleCurrentSourceNumber,
      numberOfSources,
      currentSourceNumber,
    };

    const { getByTestId } = render(<SourceSelector {...initialProps} />);

    const target = getByTestId("moveSelectionRight");

    fireEvent.click(target);
    fireEvent.click(target);
    fireEvent.click(target);

    expect(handleCurrentSourceNumber).toBeCalledTimes(3);
  });

  it("prevent click left when number is not more than 1", () => {
    const handleCurrentSourceNumber = jest.fn();
    const numberOfSources = 5;
    const currentSourceNumber = 1;

    const initialProps = {
      handleCurrentSourceNumber,
      numberOfSources,
      currentSourceNumber,
    };

    const { getByTestId } = render(<SourceSelector {...initialProps} />);

    const target = getByTestId("moveSelectionLeft");

    fireEvent.click(target);

    expect(handleCurrentSourceNumber).toBeCalledTimes(0);
  });

  it("click left when number is more than 1", () => {
    const handleCurrentSourceNumber = jest.fn();
    const numberOfSources = 5;
    const currentSourceNumber = 5;

    const initialProps = {
      handleCurrentSourceNumber,
      numberOfSources,
      currentSourceNumber,
    };

    const { getByTestId } = render(<SourceSelector {...initialProps} />);

    const target = getByTestId("moveSelectionLeft");

    fireEvent.click(target);
    fireEvent.click(target);
    fireEvent.click(target);

    expect(handleCurrentSourceNumber).toBeCalledTimes(3);
  });
});
