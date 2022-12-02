import getFileType from "../../utils/getFileType";

describe("get file type from file", () => {
  it("return 'text' when input file type is text/plain", () => {
    expect(getFileType("text/plain")).toBe("text");
  });

  it("return 'audio' when input file type is audio/wav", () => {
    expect(getFileType("audio/wav")).toBe("audio");
  });

  it("return 'audio' when input file type is audio/mp3", () => {
    expect(getFileType("audio/mp3")).toBe("audio");
  });

  it("return null when input file type is invalid", () => {
    expect(getFileType("audio")).toBe(null);
  });
});
