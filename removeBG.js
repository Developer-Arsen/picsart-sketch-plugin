import sketch from 'sketch';
import setApiKey from './set_API_Key';
const UI = sketch.UI;

function getApiKey() {
  const apiKey = sketch.Settings.settingForKey('api-key');
  if (!apiKey) {
    return setApiKey().catch(() => {});
  } else {
    return Promise.resolve(apiKey);
  }
}

async function removeBackground(apiKey, imageData, selectedLayer) {
  const formData = new FormData();
  formData.append('image', {
    fileName: 'image.png',
    mimeType: 'image/png',
    data: imageData,
  });

  try {
    UI.message("Checking API Key...");
    const response = await fetch('https://api.picsart.io/tools/1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Picsart-API-Key': apiKey,
      },
      body: formData,
    });

    if (response.ok) {
      UI.message("Removing background...");
      const result = await response.json();
      const imageUrl = result.data.url;
      const imageResponse = await fetch(imageUrl, { method: 'GET' });
      const newImageData = await imageResponse.blob();
      const document = sketch.getSelectedDocument();
      const page = document.selectedPage;

      const newImageLayer = new sketch.Image({
        image: newImageData,
        parent: page,
        frame: {
          x: selectedLayer.frame.x,
          y: selectedLayer.frame.y,
          width: selectedLayer.frame.width,
          height: selectedLayer.frame.height,
        }
      });

      selectedLayer.remove();
      UI.message('Background removed successfully!');
    } else {
      handleErrorResponse(response);
    }
  } catch (error) {
    UI.message('Error during request: ' + error.message);
  }
}

function handleErrorResponse(response) {
  switch (response.status) {
    case 400: UI.message("Error: Invalid image arguments."); break;
    case 401: UI.message("Error: App token was not provided or is invalid."); break;
    case 403: UI.message("Error: Forbidden."); break;
    case 404: UI.message("Error: Not found."); break;
    case 402: UI.message("Error: Insufficient payments."); break;
    case 405: UI.message("Error: Method Not Allowed."); break;
    case 413: UI.message("Error: Payload Too Large."); break;
    case 415: UI.message("Error: Unsupported Media Type."); break;
    case 429: UI.message("Error: Too many requests."); break;
    case 431: UI.message("Error: Request Header Fields Too Large."); break;
    case 500: UI.message("Error: Internal server error."); break;
    case 503: UI.message("Error: Service unavailable."); break;
  }
}

export default async function() {
  const selectedLayers = sketch.getSelectedDocument().selectedLayers;

  if (selectedLayers.isEmpty) {
    UI.message('Please select an image layer.');
    return;
  }

  const selectedLayer = selectedLayers.layers[0];
  if (selectedLayer.type !== 'Image') {
    UI.message('Please select an image layer.');
    return;
  }

  getApiKey().then(async (apiKey) => {
    if (!apiKey) {
      UI.message('Please enter your Remove.bg API key');
      return;
    }

    try {
      const imageData = selectedLayer.image.nsdata;
      if (!imageData) {
        UI.message('Failed to retrieve image data.');
        return;
      }
      await removeBackground(apiKey, imageData, selectedLayer);
    } catch (err) {
      UI.message('Error retrieving image data: ' + err.message);
    }
  });
}