import sketch from 'sketch'

export default function logout() {
    sketch.Settings.setSettingForKey('api-key', null);
    sketch.UI.message('API key has been reset. You have been logged out.');
}