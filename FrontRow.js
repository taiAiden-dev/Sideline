let lineUp
let finalLineUp
let midSwitch

let playalist
let gametime = []
let serve = true
let servetruth = false

let date = new Date().toLocaleString()

function redo(sword){
    if (sword){
        serve = true
        document.getElementById("turnes").innerText = "Serve"
        if (servetruth){
            rotate(lineUp)
            servetruth = false
        }
    } else {
        serve = false
        servetruth = true
        document.getElementById("turnes").innerText = "Recieve"
        gametime.push(`${lineUp[0]} - Serve End`)
        playalist.scorebook[playalist.scorebook.length - 1] = gametime
        window.seam.UpdateStats(playalist)
    }
}

function foSho(lineUp){
    console.log("b")
    lineUp.forEach((look, index) => {
        if (index == 6) return
        console.log(look)
        const name = document.createElement("p")
        name.innerText = look
        let tok = String(look)
        let pos = index + 1
        document.getElementById(pos).innerText = ""
        console.log(document.getElementById(String(pos)))
        document.getElementById(String(pos)).appendChild(name)
        playalist.playerStats[look] ??= {}
        let rowed = document.createElement("div")
        document.getElementById(String(pos)).appendChild(rowed)
        let killB = document.createElement("button")
        killB.innerText = "Kill"
        let assistB = document.createElement("button")
        assistB.innerText = "Assist"
        let digB = document.createElement("button")
        digB.innerText = "Dig"
        console.log(lineUp.indexOf(look) >= 2 && lineUp.indexOf(look) < 5)


        killB.onclick = () => {
            playalist.playerStats[tok] ??= {}
            playalist.playerStats[tok].Kills ??= 0
            playalist.playerStats[tok].Kills += 1
            gametime.push(`${look}-K`)
            playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
            playalist.scorebook[playalist.scorebook.length - 1].score[0] += 1
            console.log(playalist.scorebook.at(-1).score)
            document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
            redo(true)
            window.seam.UpdateStats(playalist)
        }

        assistB.onclick = () => {
            playalist.playerStats[tok] ??= {}
            playalist.playerStats[tok].Assists ??= 0
            playalist.playerStats[tok].Assists += 1
            gametime.push(`${look}-As`)
            playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
            window.seam.UpdateStats(playalist)
        }

        digB.onclick = () => {
            playalist.playerStats[tok] ??= {}
            playalist.playerStats[tok].Digs ??= 0
            playalist.playerStats[tok].Digs += 1
            gametime.push(`${look}-D`)
            playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
            window.seam.UpdateStats(playalist)
        }

        if (pos >= 2 && pos < 5){
            const blockB = document.createElement("button")
            blockB.innerText = "Block"

            blockB.onclick = () => {
                playalist.playerStats[tok] ??= {}
                playalist.playerStats[tok].Blocks ??= 0
                playalist.playerStats[tok].Blocks += 1
                gametime.push(`${look}-B`)
                playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
                window.seam.UpdateStats(playalist)
            }
            rowed.appendChild(blockB)
        } else if(lineUp.indexOf(look) == 0) {
            const aceB = document.createElement("button")
            aceB.innerText = "Ace"
            const servicePointB = document.createElement("button")
            servicePointB.innerText = "Service Point"

            aceB.onclick = () => {
                playalist.playerStats[tok] ??= {}
                playalist.playerStats[tok].Aces ??= 0
                playalist.playerStats[tok].Aces += 1
                gametime.push(`${look}-Ace`)
                playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
                playalist.scorebook[playalist.scorebook.length - 1].score[0] += 1
                document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
                redo(true)
                window.seam.UpdateStats(playalist)
            }

            servicePointB.onclick = () => {
                playalist.playerStats[tok] ??= {}
                playalist.playerStats[tok].ServicePoints ??= 0
                playalist.playerStats[tok].ServicePoints += 1
                gametime.push(`${look}-SP`)
                playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
                window.seam.UpdateStats(playalist)
            }
            rowed.appendChild(aceB)
            rowed.appendChild(servicePointB)
        }
        rowed.appendChild(killB)
        rowed.appendChild(assistB)
        rowed.appendChild(digB)
    })
}

function rotate(lineUp){
    let heldPlayer = lineUp.shift()
    lineUp.push(heldPlayer)
    console.log(lineUp[3])
    let libs = playalist.totalPlayers.Libero
    if (lineUp.findIndex(p => libs.some(lib => lib.player === p)) == 3){
        let libTemp = lineUp[3]
        lineUp[3] = midSwitch
        midSwitch = lineUp[0]
        lineUp[0] = libTemp
    }
    console.log(lineUp)
    gametime.push(`${lineUp[0]} - Serve Start`)
    playalist.scorebook[playalist.scorebook.length - 1] = gametime
    window.seam.UpdateStats(playalist)
    foSho(lineUp)
}

window.seam.onHandshake((data) => {
    console.log("h")
    finalLineUp = data
    if (finalLineUp != undefined){
        console.log(finalLineUp)
        document.getElementById("rotateSignal").hidden = false
        lineUp = finalLineUp
        midSwitch = finalLineUp[6]
        lineUp.splice(-1, 1)
        // document.getElementById("vorets").innerText = finalLineUp
        console.log(lineUp)
        console.log(midSwitch)
        foSho(lineUp)
    } else {
        console.error("fork")
    }
})
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("turnes").innerText = "Serve"

    const serviceErrB = document.getElementById("coachWilly")
    console.log("balls")
    await window.seam.fetchRoster().then((data) => {
        playalist = data
        console.log(playalist)
        playalist.scorebook.push({
            "gameDay": date,
            "gameRec": [],
            "score": [0, 0]
        })
        if (playalist.lastSetup != undefined){
            if(playalist.lastSetup[6]){
                midSwitch = playalist.lastSetup[6]
                let currentSetUp = [...playalist.lastSetup]
                currentSetUp.splice(-1, 1)
                console.log(currentSetUp)
                // document.getElementById("vorets").innerText = currentSetUp
                lineUp = currentSetUp
                foSho(currentSetUp)
                console.log(document.getElementById("1").innerText)
            } else {
                playalist.totalPlayers.MiddleBlocker.forEach(player => {
                    if (!playalist.lastSetup.includes(player.player)) {
                        playalist.lastSetup.push(player.player)
                        midSwitch = playalist.lastSetup[6]
                        let currentSetUp = [...playalist.lastSetup]
                        currentSetUp.splice(-1, 1)
                        console.log(currentSetUp)
                        // document.getElementById("vorets").innerText = currentSetUp
                        lineUp = currentSetUp
                        foSho(currentSetUp)
                        console.log(document.getElementById("1").innerText)
                    }
                })
            }
        }
        gametime.push(`${lineUp[0]} - Serve Start`)
        playalist.scorebook[playalist.scorebook.length - 1] = gametime
        window.seam.UpdateStats(playalist)
    })

    document.getElementById("rotateSignal").hidden = false
    await window.seam.UpdateStats(playalist)
    playalist.scorebook[playalist.scorebook.length - 1].gameRec ??= []
    gametime = playalist.scorebook[playalist.scorebook.length - 1].gameRec


    let balled = "no"
    document.getElementById("nored").onclick = () => {
        window.seam.blow()
        console.log(playalist.totalPlayers)
        window.seam.som(playalist.totalPlayers)
        document.getElementById("nored").hidden = true
    }

    serviceErrB.onclick = () => {
        let server = document.getElementById("1").querySelector("p").innerText
        redo(false)
        playalist.playerStats[server] ??= {}
        playalist.playerStats[server].ServeErr ??= 0
        playalist.playerStats[server].ServeErr += 1
        gametime.push(`${server}-ServeErr`)
        playalist.scorebook[playalist.scorebook.length - 1].score[1] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
        window.seam.UpdateStats(playalist)
    }

    document.getElementById("rotateSignal").onclick = () => rotate(lineUp)

    document.getElementById("pointLost").onclick = () => {
        gametime.push("PL")
        redo(false)
        playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
        playalist.scorebook[playalist.scorebook.length - 1].score[1] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
        window.seam.UpdateStats(playalist)
    }

    document.getElementById("pointGained").onclick = () => {
        gametime.push("PG")
        playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
        playalist.scorebook[playalist.scorebook.length - 1].score[0] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
        redo(true)
        window.seam.UpdateStats(playalist)
    }
})