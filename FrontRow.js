let lineUp
let finalLineUp
let midSwitch

let playalist
let libs = []
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
        if (!servetruth) {
            gametime.push(`${lineUp[0].wallet} - Serve End`)
        }
        servetruth = true
        document.getElementById("turnes").innerText = "Recieve"
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
        playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
        window.seam.UpdateStats(playalist)
    }
}

function foSho(lineUp){
    console.log("b")
    console.log(libs)
    lineUp.forEach((look, index) => {
        if (index == 6) return
        console.log(look    )
        const name = document.createElement("p")
        name.innerText = look.wallet
        let tok = String(look.wallet)
        let pos = index + 1
        let insight = playalist.totalPlayers.findIndex(pp => pp.player === tok)
        document.getElementById(pos).innerText = ""
        console.log(document.getElementById(String(pos)))
        document.getElementById(String(pos)).appendChild(name)
        // playalist.totalPlayers[look].playerStats ??= {}
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
            let server = playalist.totalPlayers.findIndex(pp => pp.player === document.getElementById("1").querySelector("p").innerText) //document.getElementById("1").querySelector("p").innerText
            playalist.totalPlayers[insight].playerStats ??= {}
            playalist.totalPlayers[insight].playerStats.Kills ??= 0
            playalist.totalPlayers[insight].playerStats.Kills += 1
            gametime.push(`${look.wallet}-K`)
            document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
            playalist.totalPlayers[server].playerStats.ServicePoints ??= 0
            playalist.totalPlayers[server].playerStats.ServicePoints += 1
            playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
            playalist.scorebook[playalist.scorebook.length - 1].score[0] += 1
            console.log(playalist.scorebook.at(-1).score)
            document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
            redo(true)
            window.seam.UpdateStats(playalist)
        }

        assistB.onclick = () => {
            playalist.totalPlayers[insight].playerStats ??= {}
            playalist.totalPlayers[insight].playerStats.Assists ??= 0
            playalist.totalPlayers[insight].playerStats.Assists += 1
            gametime.push(`${look.wallet}-As`)
            document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
            playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
            window.seam.UpdateStats(playalist)
        }

        digB.onclick = () => {
            playalist.totalPlayers[insight].playerStats ??= {}
            playalist.totalPlayers[insight].playerStats.Digs ??= 0
            playalist.totalPlayers[insight].playerStats.Digs += 1
            gametime.push(`${look.wallet}-D`)
            document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
            playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
            window.seam.UpdateStats(playalist)
        }

        if (pos >= 2 && pos < 5){
            const blockB = document.createElement("button")
            blockB.innerText = "Block"

            blockB.onclick = () => {
                playalist.totalPlayers[insight].playerStats ??= {}
                playalist.totalPlayers[insight].playerStats.Blocks ??= 0
                playalist.totalPlayers[insight].playerStats.Blocks += 1
                gametime.push(`${look.wallet}-B`)
                document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
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
                // COME HERE BB
                let server = playalist.totalPlayers.findIndex(pp => pp.player === document.getElementById("1").querySelector("p").innerText)
                console.log(playalist.totalPlayers.findIndex(pp => pp.player === tok))
                playalist.totalPlayers[insight]
                playalist.totalPlayers[insight].playerStats ??= {}
                playalist.totalPlayers[insight].playerStats.Aces ??= 0
                playalist.totalPlayers[insight].playerStats.Aces += 1
                gametime.push(`${look.wallet}-Ace`)
                document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
                playalist.totalPlayers[server].playerStats.ServicePoints ??= 0
                playalist.totalPlayers[server].playerStats.ServicePoints += 1
                playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
                playalist.scorebook[playalist.scorebook.length - 1].score[0] += 1
                document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
                redo(true)
                window.seam.UpdateStats(playalist)
            }

            servicePointB.onclick = () => {
                playalist.totalPlayers[insight].playerStats ??= {}
                playalist.totalPlayers[insight].playerStats.ServicePoints ??= 0
                playalist.totalPlayers[insight].playerStats.ServicePoints += 1
                gametime.push(`${look.wallet}-SP`)
                document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
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
    // let libs = playalist.totalPlayers.Libero
    // if (lineUp.findIndex(p => libs.some(lib => lib.player === p)) == 3){
    //     let libTemp = lineUp[3]
    //     lineUp[3] = midSwitch
    //     midSwitch = lineUp[0]
    //     lineUp[0] = libTemp
    // }
    // playalist.totalPlayers.forEach(kneepad => {
    //     if (lineUp[3] == kneepad.player && kneepad.position == "Libero") {
    //         let libTemp = lineUp[3]
    //         lineUp[3] = midSwitch
    //         midSwitch = lineUp[0]
    //         lineUp[0] = libTemp
    //     }
    // })
    if (libs.contains(lineUp[3])){
        let libTemp = lineUp[3]
        lineUp[3] = midSwitch
        midSwitch = lineUp[0]
        lineUp[0] = libTemp
    }
    console.log(lineUp)
    gametime.push(`${lineUp[0].wallet} - Serve Start`)
    document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
    playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
    window.seam.UpdateStats(playalist)
    foSho(lineUp)
}

window.seam.onHandshake((data) => {
    console.log("h")
    finalLineUp = data
    libs.push(finalLineUp.totalPlayers.some(l => l.position === "Libero").player)
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
        libs.push(playalist.totalPlayers.some(l => l.position === "Libero").player)
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
            } // else {
            //     playalist.totalPlayers.MiddleBlocker.forEach(player => {
            //         if (!playalist.lastSetup.includes(player.player)) {
            //             playalist.lastSetup.push(player.player)
            //             midSwitch = playalist.lastSetup[6]
            //             let currentSetUp = [...playalist.lastSetup]
            //             currentSetUp.splice(-1, 1)
            //             console.log(currentSetUp)
            //             // document.getElementById("vorets").innerText = currentSetUp
            //             lineUp = currentSetUp
            //             foSho(currentSetUp)
            //             console.log(document.getElementById("1").innerText)
            //         }
            //     })
            // }
        }
        gametime.push(`${lineUp[0].wallet} - Serve Start`)
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
        playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
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
        let server = playalist.totalPlayers.findIndex(pp => pp.player === document.getElementById("1").querySelector("p").innerText)
        redo(false)
        playalist.totalPlayers[server].playerStats ??= {}
        playalist.totalPlayers[server].playerStats.ServeErr ??= 0
        playalist.totalPlayers[server].playerStats.ServeErr += 1
        gametime.push(`${server}-ServeErr`)
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
        playalist.scorebook[playalist.scorebook.length - 1].score[1] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
        window.seam.UpdateStats(playalist)
    }

    document.getElementById("rotateSignal").onclick = () => rotate(lineUp)

    document.getElementById("pointLost").onclick = () => {
        gametime.push("PL")
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
        redo(false)
        playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
        playalist.scorebook[playalist.scorebook.length - 1].score[1] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
        window.seam.UpdateStats(playalist)
    }

    document.getElementById("pointGained").onclick = () => {
        let server = playalist.totalPlayers.findIndex(pp => pp.player === document.getElementById("1").querySelector("p").innerText)
        gametime.push("PG")
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1]
        playalist.scorebook[playalist.scorebook.length - 1].gameRec = gametime
        playalist.scorebook[playalist.scorebook.length - 1].score[0] += 1
        playalist.totalPlayers[server].playerStats.ServicePoints ??= 0
        playalist.totalPlayers[server].playerStats.ServicePoints += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebook.at(-1).score[0]} - ${playalist.scorebook.at(-1).score[1]} `
        redo(true)
        window.seam.UpdateStats(playalist)
    }

    document.getElementById("dispatch").onclick = () => {
        window.seam.blow()
    }

    document.getElementById("SUBBB").onclick = async () => {
        window.seam.servingSub()
        let ided = await window.seam.sworded()
        console.log(ided)
        if (ided){
            foSho(playalist)
        }
    }
})