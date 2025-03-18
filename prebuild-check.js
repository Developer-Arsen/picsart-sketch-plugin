const { execSync } = require("child_process");
const os = require("os");

const requiredMacOSVersion = 12;
const requiredSketchVersion = 71;
const requiredNodeVersion = 14;

const parseVersion = (versionString) => versionString.match(/\d+/g).map(Number);

const run = () => {

  const checkMacVersion = () => {
    const macVersion = parseVersion(os.release())[0];
    if (macVersion < requiredMacOSVersion) {
      throw new Error(
        `❌ macOS version ${macVersion} is too low. Required: ${requiredMacOSVersion}+`
      );
    }
  };
  
  const checkNodeVersion = () => {
    const nodeVersion = parseVersion(process.version)[0];
    if (nodeVersion < requiredNodeVersion) {
      throw new Error(
        `❌ Node.js version ${nodeVersion} is too low. Required: ${requiredNodeVersion}+`
      );
    }
  };
  
  const checkSketchVersion = () => {
    try {
      const sketchVersionString = execSync(
        "defaults read /Applications/Sketch.app/Contents/Info CFBundleShortVersionString",
        {
          encoding: "utf-8",
        }
      ).trim();
      const sketchVersion = parseVersion(sketchVersionString)[0];

      if (sketchVersion < requiredSketchVersion) {
        throw new Error(
          `❌ Sketch version ${sketchVersion} is too low. Required: ${requiredSketchVersion}+`
        );
      }
    } catch (error) {
      if (error.message.includes("too low")) {
        throw error
      }
  
      throw new Error("❌ Sketch is not installed or cannot retrieve version.");
    }
  
    return "✅ All system requirements met.";
  };
  return {
    checkMacVersion, checkNodeVersion, checkSketchVersion
  }
}

(() => {
  try {
    const { checkMacVersion, checkNodeVersion, checkSketchVersion } = run();
    checkMacVersion();
    checkNodeVersion();
    checkSketchVersion();
  } catch (error) {
    console.error(error.message);
  }
})();

module.exports = { run };
