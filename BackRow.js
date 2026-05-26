const {app, dialog, BrowserWindow, ipcMain, Notification} = require('electron')
const path = require('path')
const fs = require('fs')

let mainWin
let backupWin

let temp

const storagePathed = path.join(__dirname, "roster.json")

function jerseys(){
    const team = JSON.parse(fs.readFileSync(storagePathed, "utf-8"))
    console.log("hello" , team)
    return team
}

async function nono(){
    backupWin = new BrowserWindow({
        width: 400,
        height: 300,
        parent: mainWin,
        modal: true,
        webPreferences: {
            preload: path.join(__dirname, "Pipe.js")
        }
    })
    backupWin.loadFile("doubleDown.html")
    backupWin.webContents.openDevTools()
}

function createWindow(){
    mainWin = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "Pipe.js")
        }
    })
    mainWin.loadFile("personView.html")
    mainWin.webContents.openDevTools()
}

app.whenReady().then(createWindow)

ipcMain.handle("testing",  () => {
    new Notification({
        title: "hello",
        body: "no nigga"
    }).show()
})

ipcMain.handle("porp", async () => {
    await nono()
})
ipcMain.handle("nort", (event, playlort, kort) => {
    // if (kort) {
    //     if(playlort == null) return temp
    //     temp = playlort
    // } else {
    //     temp = playlort
    // }
    switch (true){
        case (kort == 1):
            return temp
        case (kort == 2):
            temp = playlort
            break
    }
})

ipcMain.handle("rosterGet", () => {
    let shirt = jerseys()
    return shirt
})

ipcMain.handle("StatUpdater", (event, rooster) => {
    fs.writeFileSync(storagePathed, JSON.stringify(rooster, null, 2))
})

ipcMain.on("balls", (event, data) => {
    try {
        console.log(data)
        backupWin.webContents.once("did-finish-load", () => {
            backupWin.webContents.send("balls", data)
        })
    } catch (err) {
        console.log(err)
    }
})

ipcMain.on("balls2", (event, data) => {
    let loaded = jerseys()
    loaded.lastSetup = data
    fs.writeFileSync(storagePathed, JSON.stringify(loaded, null, 2))
    mainWin.webContents.send("balls", data)
})