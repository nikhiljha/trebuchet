const { app, BrowserWindow, Menu, screen } = require('electron');
require('electron-reload')(__dirname);

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Menu.setApplicationMenu(false);

    window = new BrowserWindow({
        // width: width / 2,
        // height: height / 1.25,
        width: 320,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    window.loadFile('public/index.html');
};

let window = null;

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());