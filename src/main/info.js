const { dialog } = require('electron');

function showShorcutInfo(platform) {
  const ctrlOrCmd = platform === 'darwin' ? 'Cmd' : 'Ctrl';

  const options = {
    type: 'info',
    message: 'Shortcuts',
    detail: `
    ${ctrlOrCmd} + F: Enable/disable fullscreen \n
    ${ctrlOrCmd} + O: OpenFile \n
    ${ctrlOrCmd} + S: Show shortcuts \n
    ${ctrlOrCmd} + Down: Zoom Out \n
    ${ctrlOrCmd} + Up: Zoom In \n
    Left: Previous page \n
    Right: Next page \n
    `,
    noLinks: true,
  };
  dialog.showMessageBox(options);
}

const API = {
  showShorcutInfo,
};

module.exports = API;
