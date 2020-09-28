window.addEventListener('DOMContentLoaded', () => {
    if (process.platform !== 'darwin') {
        const customTitlebar = require('custom-electron-titlebar');
        new customTitlebar.Titlebar({
            backgroundColor: customTitlebar.Color.fromHex('#ECECEC'),
            menu: null
        });
    }
})