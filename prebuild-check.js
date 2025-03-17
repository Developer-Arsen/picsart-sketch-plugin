const { execSync } = require("child_process");
const os = require("os");

const requiredMacOSVersion = 12;
const requiredSketchVersion = 71;
const requiredNodeVersion = 14;

const parseVersion = (versionString) =>
  versionString.match(/\d+/g).map(Number)

const macVersion = parseVersion(os.release())[0];
if (macVersion < requiredMacOSVersion) {
  console.error(`❌ macOS version ${macVersion} is too low. Required: ${requiredMacOSVersion}+`);
  process.exit(1);
}

const nodeVersion = parseVersion(process.version)[0];
if (nodeVersion < requiredNodeVersion) {
  console.error(`❌ Node.js version ${nodeVersion} is too low. Required: ${requiredNodeVersion}+`);
  process.exit(1);
}

try {
  const sketchVersionString = execSync("defaults read /Applications/Sketch.app/Contents/Info CFBundleShortVersionString", {
    encoding: "utf-8",
  }).trim();
  const sketchVersion = parseVersion(sketchVersionString)[0];

  if (sketchVersion < requiredSketchVersion) {
    console.error(`❌ Sketch version ${sketchVersion} is too low. Required: ${requiredSketchVersion}+`);
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Sketch is not installed or cannot retrieve version.");
  process.exit(1);
}

console.log("✅ All system requirements met. Proceeding with build.");
