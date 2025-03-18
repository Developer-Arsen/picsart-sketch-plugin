// prebuild.test.js
const { execSync } = require("child_process");
const os = require("os");
const { run } = require("./prebuild-check");

jest.mock("os");
jest.mock("child_process", () => ({
  execSync: jest.fn(),
}));

describe("Prebuild Script Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if macOS version is lower than required", () => {
    os.release.mockReturnValue("10.0.0"); // Mock macOS version 10
    expect(() => run().checkMacVersion()).toThrowError(
      "❌ macOS version 10 is too low. Required: 12+"
    );
  });

  it("should throw error if macos version is lowern than required ", () => {
    os.release.mockReturnValue("11.2.0");
    expect(() => run().checkMacVersion()).toThrowError(
      "❌ macOS version 11 is too low. Required: 12+"
    );
  });

  it("should throw error if macos is lower than required", () => {
    os.release.mockReturnValue("9.0.1");
    expect(() => run().checkMacVersion()).toThrowError(
      "❌ macOS version 9 is too low. Required: 12+"
    );
  });

  it("should throw error if macos is lower than required", () => {
    os.release.mockReturnValue("9.9.1");
    expect(() => run().checkMacVersion()).toThrowError(
      "❌ macOS version 9 is too low. Required: 12+"
    );
  });

  it("it should not throw error because os version is higher then required", () => {
    os.release.mockReturnValue("12.0.1");
    expect(() => run().checkMacVersion()).not.toThrow();
  });

  it("it should throw error because node version is lower then required", () => {
    Object.defineProperty(process, "version", {
      value: "v12.0.1",
    });

    expect(() => run().checkNodeVersion()).toThrowError(
      "❌ Node.js version 12 is too low. Required: 14"
    );
  });

  it("it should throw error because node version is lower then required", () => {
    Object.defineProperty(process, "version", {
      value: "v10.0.1",
    });

    expect(() => run().checkNodeVersion()).toThrowError(
      "❌ Node.js version 10 is too low. Required: 14"
    );
  });

  it("it should throw error because node version is lower then required", () => {
    Object.defineProperty(process, "version", {
      value: "v9.0.1",
    });

    expect(() => run().checkNodeVersion()).toThrowError(
      "❌ Node.js version 9 is too low. Required: 14"
    );
  });

  it("it should throw error because node version is lower then required", () => {
    Object.defineProperty(process, "version", {
      value: "v7.0.1",
    });

    expect(() => run().checkNodeVersion()).toThrowError(
      "❌ Node.js version 7 is too low. Required: 14"
    );
  });

  it("it should not throw error because node version is upper then required", () => {
    Object.defineProperty(process, "version", {
      value: "v14.0.1",
    });

    expect(() => run().checkNodeVersion()).not.toThrow();
  });

  it("it should not throw error because node version is upper then required", () => {
    Object.defineProperty(process, "version", {
      value: "v16.0.1",
    });

    expect(() => run().checkNodeVersion()).not.toThrow();
  });

  it("it should not throw error because node version is upper then required", () => {
    Object.defineProperty(process, "version", {
      value: "v20.0.1",
    });

    expect(() => run().checkNodeVersion()).not.toThrow();
  });

  it("should throw an error if Sketch version is lower than required", () => {
    execSync.mockImplementation(() => "69.0"); // Mock Sketch version 69

    expect(() => run().checkSketchVersion()).toThrowError(
      "❌ Sketch version 69 is too low. Required: 71+"
    );
  });

  it("should not throw an error if Sketch version is valid", () => {
    execSync.mockImplementation(() => "72.0");

    expect(() => run().checkSketchVersion()).not.toThrow();
  });

  it("should not throw an error if Sketch version is valid", () => {
    execSync.mockImplementation(() => "100.0");

    expect(() => run().checkSketchVersion()).not.toThrow();
  });

  it("should not throw an error if Sketch version is valid", () => {
    execSync.mockImplementation(() => "101.0");

    expect(() => run().checkSketchVersion()).not.toThrow();
  });

  it("should not throw an error if Sketch version is valid", () => {
    execSync.mockImplementation(() => "122.0");

    expect(() => run().checkSketchVersion()).not.toThrow();
  });

  it("should not throw an error if Sketch version is valid", () => {
    execSync.mockImplementation(() => "99.0");

    expect(() => run().checkSketchVersion()).not.toThrow();
  });

  it("should throw an error lower sketch level than required", () => {
    execSync.mockImplementation(() => "2.0");

    expect(() => run().checkSketchVersion()).toThrowError(
      "❌ Sketch version 2 is too low. Required: 71+"
    );
  });

  it("should handle case when Sketch is not installed", () => {
    execSync.mockImplementation(() => {
      throw new Error("Sketch not found");
    });

    expect(() => run().checkSketchVersion()).toThrowError(
      "❌ Sketch is not installed or cannot retrieve version."
    );
  });
});
