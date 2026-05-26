const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld("seam", {
    test: () => ipcRenderer.invoke("testing"),
    refine: (event, playlort, kort) => ipcRenderer.invoke("nort", event, playlort, kort),
    blow: () => ipcRenderer.invoke("porp"),
    som: (no) => ipcRenderer.send("balls", no),
    fetchRoster: () => ipcRenderer.invoke("rosterGet"),
    UpdateStats: (logsed) => ipcRenderer.invoke("StatUpdater", logsed),
    onHandshake: (callback) => {
        ipcRenderer.once("balls", (event, data) => {
            callback(data)
        })
    },
    moss: (not) => ipcRenderer.send("balls2", not),
    onOverrule: (callback) => {
        ipcRenderer.once("balls2", (event, data) => {
            callback(data)
        })
    }
})