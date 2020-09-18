const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');

const createWindow = () => {
	const win = new BrowserWindow({ width: 800, height: 600 });

	let dev = false;

	if (process.env.NODE_ENV === 'development') {
		dev = true;
	}

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
			host: path.join(__dirname, '../build/index.html'),
			slashes: true,
		});
	}

	win.loadURL(indexPath);
};

app.on('ready', createWindow);
