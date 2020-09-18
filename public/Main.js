const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');

let mainWindow;

let dev = false;

if (process.env.NODE_ENV === 'development') {
	dev = true;
}
const createWindow = () => {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });

	let indexPath;

	if (dev) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:3000',
			pathname: 'index.html',
			slashes: true,
		});
	} else {
		indexPath = url.format({
			protocol: 'file:',
			host: path.join(__dirname, '../build', 'index.html'),
			slashes: true,
		});
	}

	mainWindow.loadURL(indexPath);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.on('closed', () => (mainWindow = null));
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
