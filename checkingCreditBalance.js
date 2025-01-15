import sketch from 'sketch';
const UI = sketch.UI;


const getCreditBalance = async () => {
    const apiKey = sketch.Settings.settingForKey('api-key');
    const url = "https://api.picsart.io/tools/1.0/balance";
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Picsart-API-Key': apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        UI.getInputFromUser(
            `Credits Available:  ${data.credits}\n`,
            {
                description: "Do You Want To Buy More Credits",
                type: UI.INPUT_TYPE.selection,
                possibleValues: ["YES", "NO"],
            },
            (err, value) => {
                if (err) {
                    UI.message("No selection made. Operation canceled.");
                    return;
                }
               if (value === "YES") {
                NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://console.picsart.io/dashboard/usage/api/?type=subscription"));
                } else {
                    UI.message("Operation canceled.");
                }
            }
        );
    } catch (error) {
        UI.message("Error fetching credit balance: " + error.message);
        return null;
    }
};

export default getCreditBalance;
