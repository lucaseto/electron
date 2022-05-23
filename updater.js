const { dialog } = require("electron")
const {autoUpdater} = require("electron-updater")
const {dialog} = require('electron')

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

//create a file in .... your-links folder log
//~/Library/logs/your-links/main.log

autoUpdater.autoDownload = false

module.exports = () => {
	console.log('cheking for updates')
	autoUpdater.checkForUpdates()
	autoUpdater.on('update-available',() => {
        dialog.showMessageBox({
            type:'info',
            title:'Update available',
            message:'A new version of your-links is available',
            buttons:['Update', 'No']
        }).then(result => {
            let buttonIndex = result.response
            if(buttonIndex == 0) autoUpdater.downloadUpdate()
        })
    })

    autoUpdater.on('update-downloaded',() => {

        dialog.showMessageBox({
            type:'info',
            title:'Update ready',
            message:'Install & restart now?',
            buttons:['Yes', 'Later']
        }).then(result => {
            let buttonIndex = result.response
            let silence = false
            let forceRestar = true
            if(buttonIndex == 0) autoUpdater.quitAndInstall(silence,forceRestar)
        })
    })

}