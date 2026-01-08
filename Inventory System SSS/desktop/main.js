const { app, BrowserWindow } = require('electron');
const path = require('path');

function getIndexHtmlPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'app', 'index.html');
  }
  return path.join(__dirname, '..', 'index.html');
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 980,
    minHeight: 640,
    backgroundColor: '#0b3a5c',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.webContents.setWindowOpenHandler(() => ({ action: 'allow' }));
  win.loadFile(getIndexHtmlPath());
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
