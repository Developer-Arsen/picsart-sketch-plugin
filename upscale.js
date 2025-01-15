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

  let apiKey;
  try {
    apiKey = await getApiKey();
    if (!apiKey) {
      sketch.UI.message('No API key provided.');
      return;
    }
  } catch (err) {
    sketch.UI.message('Error retrieving API key: ' + err.message);
    return;
  }

  let upscaleFactor;
  let text = "Enhances the image resolution. Choose from four options: 2x, 4x, 6x or 8x.\n\n" + 
  "This service boosts image resolution without increasing file size, using advanced predictive and generative AI to add pixels seamlessly. Perfect for improving photo quality, especially for clean, noise-free images. "
  try {
    upscaleFactor = await new Promise((resolve, reject) => {
      UI.getInputFromUser("Upscale", {
        description: text, 
        type: UI.INPUT_TYPE.selection, 
        possibleValues: ['2', '4', '6','8'] 
      }, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(parseInt(value, 10));
        }
      });
    });
  } catch (err) {
    UI.message('Error retrieving upscale factor: ' + err.message);
    return;
  }

  let imageData;
  try {
    imageData = selectedLayer.image.nsdata; 
    if (!imageData) {
      UI.message('Failed to retrieve image data.');
      return;
    }
  } catch (err) {
    UI.message('Error retrieving image data: ' + err.message);
    return;
  }

  const formData = new FormData();
  formData.append('image', {
    fileName: 'image.png',
    mimeType: 'image/png',
    data: imageData
  });
  formData.append('upscale_factor', upscaleFactor.toString());

  try {
    UI.message("Checking API Key...");
    const response = await fetch('https://api.picsart.io/tools/1.0/sketch/upscale', {
      method: 'POST',
      headers: {
        'X-Picsart-API-Key': apiKey,
        'X-Picsart-Plugin': "Sketch"
      },
      body: formData,
    });
    UI.message("Loading...");
    const result = await response.json();
    if (response.ok) {
      UI.message("Upscaling image...");
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
          width: selectedLayer.frame.width * upscaleFactor,
          height: selectedLayer.frame.height * upscaleFactor,
        }
      });

      selectedLayer.remove();
      UI.message('Image upscaled successfully!');
      console.log(imageUrl);
    } else {
      UI.message(`Failed to process the image: ${result.message || 'Unknown error'}`);
    }
  } catch (error) {
    UI.message('Error during request: ' + error.message);
  }
}