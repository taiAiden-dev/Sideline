const {app, dialog, BrowserWindow, ipcMain, Notification} = require('electron')
const path = require('path')
const fs = require('fs')

let mainWin
let backupWin
let switched = false
let temp

const packagedPathed = path.join(app.getPath("userData"), "roster.json")
const storagePathed = path.join(__dirname, "roster.json")
if (!fs.existsSync(packagedPathed)) {
    if (fs.existsSync(storagePathed)) {
        fs.copyFileSync(storagePathed, packagedPathed);
    } else {
        fs.writeFileSync(packagedPathed, JSON.stringify({
            totalPlayers: {
                OutsideHitter: [],
                OppositeHitter: [],
                MiddleBlocker: [],
                Setter: [],
                Libero: []
            },
            lastSetup: [],
            scorebook: []
        }));
    }
}

function holyUnoptimizedCode(rt){
    if (rt){
        switched = true
    } else return switched
}

function jerseys(){
    const team = JSON.parse(fs.readFileSync(storagePathed, "utf-8"))
    console.log("hello" , team)
    return team
}

async function pt() {
    subWin = new BrowserWindow({
        width: 600,
        height: 400,
        parent: mainWin,
        modal: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "Pipe.js")
        }
    })
    subWin.loadFile("antenna.html")
    subWin.webContents.openDevTools()

    subWin.on("closed", () => {
        holyUnoptimizedCode(true)
    })
}

async function nono(){
    backupWin = new BrowserWindow({
        width: 400,
        height: 300,
        parent: mainWin,
        modal: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
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
            contextIsolation: true,
            nodeIntegration: false,
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

ipcMain.handle("Tryouts", (event, player) => {
    console.log("ping")
    let shirt = jerseys()
    shirt.totalPlayers.push(player)
    fs.writeFileSync(storagePathed, JSON.stringify(shirt, null, 2))
})

ipcMain.handle("checked", () => {
    return holyUnoptimizedCode(false)
})

ipcMain.handle("try3", async () => {
    switched = false
    await pt()
})

ipcMain.on("try", (event, data) => {
    try {
        console.log(data)
        backupWin.webContents.once("did-finish-load", () => {
            backupWin.webContents.send("try", data)
        })
    } catch (err) {
        console.log(err)
    }
})

ipcMain.on("try2", (event, data) => {
    let loaded = jerseys()
    loaded.lastSetup = data
    fs.writeFileSync(storagePathed, JSON.stringify(loaded, null, 2))
    mainWin.webContents.send("try", data)
})