const electron = require('electron');
// Module to control application life.
const {app, ipcMain} = electron;
// Essa a gente que criou
const mainWindow = require('./mainWindow');
const mainWithdraw = require('./mainWithdraw');
const mainAlert = require('./mainAlert');
const mainMenu_admin = require('./mainMenu_admin');
const PDFWindow = require('electron-pdf-window');

const path = require('path');
const url = require('url');

global['default_url'] = 'http://127.0.0.1:8000/';
global['Vendedor'] = '';
global['Vendedor_id'] = 0;
global['is_admin'] = false;
global['Cliente'] = 'Cliente';
global['Cliente_id'] = 4;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    mainWindow.createWindow({'url': 'src/html/login.html'})
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        mainWindow.createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Comunicação Login
ipcMain.on('login', (e, args) => {
    mainAlert.createWindow(args)
});

// Comunicacao menu
ipcMain.on('menu_admin', (e, args) => {
    global['Vendedor'] = args['User'];
    global['Vendedor_id'] = args['User_id'];
    global['is_admin'] = true;
    mainMenu_admin.createWindow(args)
});

// Comunicacao menu
ipcMain.on('menu_not_admin', (e, args) => {
    global['Vendedor'] = args['User'];
    global['Vendedor_id'] = args['User_id'];
    global['is_admin'] = false;
});

// Comunicacao add-client
ipcMain.on('add-client-to-sale', (e, args) => {
    global['Cliente'] = args['name'];
    global['Client_id'] = args['id'];
});

// Tela de login
ipcMain.on('new-client', (e, args) => {
    mainWindow.createWindow({'url': 'src/html/client_create.html'})
});

// Tela de venda
ipcMain.on('new-sale', (e, args) => {
    mainWindow.createWindow(args)
});

// Comunicacao menu normal
ipcMain.on('menu', (e, args) => {
    mainWindow.createWindow({'url': 'src/html/menu.html'})
});

// Comunicacao menu normal
ipcMain.on('sangria', (e, args) => {
    mainWithdraw.createWindow({'url': 'src/html/withdraw.html'})
});

ipcMain.on('pdf', (e, args) => {

    const win = new PDFWindow({
        width: 800,
        height: 600
    });

    win.loadURL(global['default_url'] + 'reports/tax_coupom');
});