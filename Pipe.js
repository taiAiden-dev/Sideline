const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld("seam", {
    test: () => ipcRenderer.invoke("testing"),
    refine: (event, playlort, kort) => ipcRenderer.invoke("nort", event, playlort, kort),
    blow: () => ipcRenderer.invoke("porp"),
    som: (no) => ipcRenderer.send("try", no),
    fetchRoster: () => ipcRenderer.invoke("rosterGet"),
    UpdateStats: (logsed) => ipcRenderer.invoke("StatUpdater", logsed),
    onHandshake: (callback) => {
        ipcRenderer.once("try", (event, data) => {
            callback(data)
        })
    },
    moss: (not) => ipcRenderer.send("try2", not),
    onOverrule: (callback) => {
        ipcRenderer.once("try2", (event, data) => {
            callback(data)
        })
    }
})