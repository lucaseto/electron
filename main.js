// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem')
const appMenu = require('./menu')
const path = require('path')
const updater = require('./updater')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('new-item', (e, itemUrl) => {
  readItem( itemUrl, item => {
    e.sender.send('new-item-success', item);
  });
})

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  //setTimeout(updater, 3000)
  
  //win state keeper
  let state = windowStateKeeper({
    defaultWidth:500, defaultHeight:650,
  })

  const iconPath = process.platform !== 'darwin'
    ? '\\icon.ico'
    :'\\icon.icns';


  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, iconPath),
    x:state.x, y:state.y,
    width: state.width, height: state.height,
    minWidth: 350, minHeight: 300, maxWidth:650,
    webPreferences: {
      worldSafeExecuteJavaScript: false, 
      contextIsolation: false,      
      nodeIntegration: true
    }
  })

  appMenu(mainWindow)


  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  //Manage new window state
  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}



// Electron `app` is ready
app.on('ready', () => {
  //console.log(app.getPath('desktop'))
  //console.log(app.getPath('music'));
  //console.log(app.getPath('temp'));
  //console.log(app.getPath('userData'));
  createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
