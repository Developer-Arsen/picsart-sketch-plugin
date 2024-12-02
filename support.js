import sketch from 'sketch';
const UI = sketch.UI;
let text1 = "1. Get Your API Key \n Visit console.picsart.io to generate your API key. Once you have it, enter the key in the My Account section of the plugin.\n\n"
let text2 = "2. Explore Commands \n Use Picsart to enhance your images with the following tools:\n - Remove Background\n - Upscale\n\n"
let text3 = "3. Check Your Credits\n Ensure you have enough credits before processing images, as each command deducts credits.\n Do you want to visit our Support Center?"



export default function(){
    UI.getInputFromUser(
        `How To Use The Plugin: `,
        {   
            description: text1 + text2 + text3,
            type: UI.INPUT_TYPE.selection,
            possibleValues: ["YES", "NO"],
        },
        (err, value) => {
            if (err) {
                UI.message("Operation canceled.");
                return;
            }

            if (value === "YES") {
                NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://help.picsart.io/hc/en-us"));
            } else {
                UI.message("Operation canceled.");
            }
        }
    );
}