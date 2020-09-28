const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Menu.setApplicationMenu(false);
    require('@treverix/remote/main').initialize()

    window = new BrowserWindow({
        // width: width / 2,
        // height: height / 1.25,
        width: 320,
        height: 300,
        frame: process.platform === 'darwin',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    window.loadFile('public/index.html');
};

let window = null;

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());