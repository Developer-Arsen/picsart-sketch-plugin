import sketch from 'sketch';
const { UI, Settings } = sketch;

function promptForApiKey() {
  return new Promise((resolve, reject) => {
    UI.getInputFromUser(
      'Enter your Picsart API Key',
      {
        description: 'Sign up at https://console.picsart.io, copy and put here your API Key.',
        okButton: 'Save API Key'
      },
      (error, apiKey) => {
        if (error) reject(error);
        else resolve(apiKey);
      }
    );
  });
}

function saveApiKeyToSettings(apiKey) {
  Settings.setSettingForKey('api-key', apiKey);
  UI.message('Your Picsart API key has been saved');
}

export default async function saveApiKey() {
  try {
    const apiKey = await promptForApiKey();
    saveApiKeyToSettings(apiKey);
    return apiKey;
  } catch (error) {
    UI.message('Failed to save the API key');
    throw error;
  }
}