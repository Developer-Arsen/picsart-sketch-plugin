# picsart-sketch-plugin
This Sketch plugin provides tools to remove image backgrounds, upscale image resolution, manage your API key, check credit balance, and log out of your Picsart API account—all from within Sketch.

## Features

### removeBG
- **Remove Backgrounds**: Removes backgrounds from selected images, enhancing design workflow by isolating subjects quickly and easily.

### Upscale
- **Image Upscaling**: Increases the resolution of selected images while preserving quality, ideal for creating high-resolution assets directly in Sketch.

### Set API Key
- **API Key Management**: Allows you to set or update your Picsart API key, which is required to use the removeBG and upscale functionalities.

### Log Out
- **Reset API Key**: Removes the stored API key from Sketch to securely log out of the Picsart API.

### Check Credit Balance
- **API Credit Balance Check**: Displays the remaining API credits available on your Picsart account to help manage usage.

## Prerequisites

- **Sketch**: Make sure you have Sketch installed.
- **Picsart API Key**: Register for an API key at [Get Picsart API key](https://docs.picsart.io/docs/creative-apis-get-api-key), which is necessary to use all plugin functionalities.

## Installation

1. **Download or Clone** the plugin repository.
2. Place the plugin files in the Sketch Plugins directory:
   - Open Sketch, go to `Plugins` > `Manage Plugins` > `Open Plugins Folder`.
   - Copy the `removeBG` and `upscale` plugin folders into this directory.
3. Restart Sketch.

## Configuration

1. **Set Your API Key**:
   - Open Sketch and go to `Plugins` > `Picsart plugin` > `Set API Key`.
   - Enter your Picsart API key when prompted to activate the removeBG and upscale functionalities.

## Usage

### removeBG Button
1. **Select an Image Layer** within your Sketch document.
2. Go to `Plugins` > `Picsart plugin` > `removeBG`.
3. The plugin will remove the background and create a new image layer.

### Upscale Button
1. **Select an Image Layer** you’d like to upscale.
2. Go to `Plugins` > `Picsart plugin` > `Upscale`.
3. The plugin will create an upscaled version of the image layer.

### Set API Key Button
1. Go to `Plugins` > `Picsart plugin` > `Set API Key`.
2. Enter your Picsart API key.

### Log Out Button
1. Go to `Plugins` > `Picsart plugin` > `Log Out`.
2. This will clear the stored API key from Sketch, logging you out of the Picsart API.

### Check Credit Balance Button
1. Go to `Plugins` > `Picsart plugin` > `Check Credit Balance`.
2. The plugin will display your remaining API credits in the Sketch UI.

## Error Handling

The plugin provides error messages directly within Sketch if:
- The API key is invalid or missing.
- The selected image format is unsupported.
- You have insufficient API credits.

## Troubleshooting

- **Invalid API Key**: Re-enter your key under `Set API Key`.
- **Credit Issues**: Use `Check Credit Balance` to view available credits.
