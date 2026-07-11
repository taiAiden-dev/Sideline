let lineUp = []
let finalLineUp
let midSwitch

let playalist
let libs
let lod = 0
let gametime = []
let serve = true
let servetruth = false


let date = new Date().toLocaleString()

function setCheck(scoreboard){
    lod = 0
    if (playalist.scorebookScrim.at(-1).lead){
        for (const num of playalist.scorebookScrim.at(-1).lead){
            lod += num
        }
    }
    if (lod == 4){
        if (scoreboard[0] >= 25 || scoreboard[1] >= 25){
            if (scoreboard[0] > scoreboard[1]){
                playalist.scorebookScrim.at(-1).lead ??= []
                playalist.scorebookScrim.at(-1).lead[0] += 1
            } else if (scoreboard[0] > scoreboard[1]) {
                playalist.scorebookScrim.at(-1).lead ??= []
                playalist.scorebookScrim.at(-1).lead[1] += 1
            }
        } else {
            if (scoreboard[0] > scoreboard[1]){
                playalist.scorebookScrim.at(-1).lead ??= []
                playalist.scorebookScrim.at(-1).lead[0] += 1
            } else if (scoreboard[0] < scoreboard[1]) {
                playalist.scorebookScrim.at(-1).lead ??= []
                playalist.scorebookScrim.at(-1).lead[1] += 1
            }
        }
    }
}

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
            gametime.at(-1).push(`${lineUp[0].wallet} - Serve End`)
        }
        servetruth = true
        document.getElementById("turnes").innerText = "Recieve"
        document.getElementById("lastSeen").innerText = ""
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
        window.seam.UpdateStats(playalist)
    }
}

// function subRotate(pp){
//     pp.forEach((bp, index) => {
//         if (index == 6) return
//         const myDiv = document.querySelector('#LINE div');

//         const targetParagraph = Array.from(myDiv.querySelectorAll('p')).find(p => p.textContent.trim() === bp.wallet);
        
//     })
// }

function nogo(store){
    let libBench = document.querySelectorAll("#leSwitch")
    let benchLib = document.querySelectorAll("#noSwitch")
    libBench.forEach(bp => {
        bp.hidden = store
    })
    benchLib.forEach(pb => {
        pb.hidden = !store
    })
}

function foSho(lookUp){
    let tempLineUp = []
    console.log("b")
    console.log(libs)
    console.log(lookUp)
    // lineUp.length = 0
    lookUp.forEach((look, index) => {
        console.log(lineUp)
        let pos = index + 1
        // console.log(!document.getElementById(String(pos)).querySelector('p') && look.position == "Libero")
        // if (!document.getElementById(String(6)).querySelector('p') && look.position == "Libero") return
        // if (lookUp.indexOf(pl => pl.position === "Libero") > 4 && lookUp.indexOf(pl => pl.position === "Libero") < 2 && lookUp.indexOf(pl => pl.position === "Libero") != 6)
        if (index == 6) return 
        
        console.log(look)
        const name = document.createElement("p")
        name.innerText = look.wallet
        let tok = String(look.wallet)
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
        console.log(lookUp.indexOf(look) >= 2 && lookUp.indexOf(look) < 5)

        if (lookUp.some(pb => pb.position === "Libero")){
            if(look.position != "Libero"){
                if (index == 0 || (index > 3 && index < 6)){
                    let switchOut = document.createElement("button")
                    switchOut.innerText = "Lib Switch"

                    switchOut.hidden = true
                    switchOut.id = "noSwitch"

                    let wholetThedogsout = libs//playalist.lastSetup.find(lp => lp.position === "Libero")
                    console.log(wholetThedogsout)
                    let libSwitch = document.createElement("button")

                    libSwitch.innerText = "Lib Sub"
                    libSwitch.id = "leSwitch"

                    libSwitch.onclick = () => {
                        midSwitch = look
                        gametime.at(-1).push(`Libero ${wholetThedogsout.wallet} for ${look.position} ${look.wallet}`)
                        look = wholetThedogsout
                        lineUp[index] = wholetThedogsout
                        document.getElementById(pos).innerText = ""
                        let nama = document.createElement('p')
                        nama.innerText = wholetThedogsout.wallet
                        // document.getElementById(pos).querySelector("p").innerText = name
                        // document.getElementById(String(pos)).appendChild(name)
                        document.getElementById(String(pos)).appendChild(nama)
                        document.getElementById(String(pos)).appendChild(rowed)
                        console.log(lineUp)
                        document.getElementById(String(pos)).querySelector('div').appendChild(switchOut)
                        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                        nogo(true)
                        window.seam.UpdateStats(playalist)
                    }

                    switchOut.onclick = () => {
                        lineUp[index] = midSwitch
                        look = midSwitch
                        gametime.at(-1).push(`${look.position} ${look.wallet} for Libero ${wholetThedogsout.wallet}`)
                        document.getElementById(pos).innerText = ""
                        let nama = document.createElement('p')
                        nama.innerText = midSwitch.wallet
                        document.getElementById(String(pos)).appendChild(nama)
                        document.getElementById(String(pos)).appendChild(rowed)
                        console.log(lineUp)
                        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                        nogo(false)
                        window.seam.UpdateStats(playalist)
                    }
                    rowed.appendChild(libSwitch)
                }
            } else {
                let switchOut = document.createElement("button")
                switchOut.innerText = "Lib Switch"

                switchOut.onclick = () => {
                    lineUp[index] = midSwitch
                    gametime.at(-1).push(`${midSwitch.position} ${midSwitch.wallet} for Libero ${look.wallet}`)
                    look = midSwitch
                    document.getElementById(pos).innerText = ""
                    let nama = document.createElement('p')
                    nama.innerText = midSwitch.wallet
                    document.getElementById(String(pos)).appendChild(nama)
                    document.getElementById(String(pos)).appendChild(rowed)
                    console.log(lineUp)
                    playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                    nogo(false)
                    window.seam.UpdateStats(playalist)
                }

                let libSwitch = document.createElement("button")

                libSwitch.hidden = true
                libSwitch.innerText = "Lib Sub"
                libSwitch.id = "leSwitch"

                libSwitch.onclick = () => {
                    midSwitch = look
                    gametime.at(-1).push(`Libero ${wholetThedogsout.wallet} for ${look.position} ${look.wallet}`)
                    look = wholetThedogsout
                    lineUp[index] = wholetThedogsout
                    document.getElementById(pos).innerText = ""
                    let nama = document.createElement('p')
                    nama.innerText = wholetThedogsout.wallet
                    // document.getElementById(pos).querySelector("p").innerText = name
                    // document.getElementById(String(pos)).appendChild(name)
                    document.getElementById(String(pos)).appendChild(nama)
                    document.getElementById(String(pos)).appendChild(rowed)
                    console.log(lineUp)
                    document.getElementById(String(pos)).querySelector('div').appendChild(switchOut)
                    playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                    nogo(true)
                    window.seam.UpdateStats(playalist)
                }
                rowed.appendChild(switchOut)
                rowed.appendChild(libSwitch)
            }
        }


        killB.onclick = () => {
            let server = playalist.totalPlayers.findIndex(se => se.player == document.getElementById("1").querySelector("p").innerText) //document.getElementById("1").querySelector("p").innerText
            playalist.totalPlayers[insight].playerStats ??= {}
            playalist.totalPlayers[insight].playerStats.Kills ??= 0
            playalist.totalPlayers[insight].playerStats.Kills += 1
            gametime.at(-1).push(`${look.wallet}-K`)
            document.getElementById("lastSeen").innerText = ""
            document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
            playalist.totalPlayers[server].playerStats.ServicePoints ??= 0
            playalist.totalPlayers[server].playerStats.ServicePoints += 1
            playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
            playalist.scorebookScrim[playalist.scorebookScrim.length - 1].score[0] += 1
            console.log(playalist.scorebookScrim.at(-1).score)
            document.getElementById("scoreboardX2").innerText = `${playalist.scorebookScrim.at(-1).score[0]} - ${playalist.scorebookScrim.at(-1).score[1]} `
            redo(true)
            window.seam.UpdateStats(playalist)
            setCheck(playalist.scorebookScrim.at(-1).score)
        }

        assistB.onclick = () => {
            playalist.totalPlayers[insight].playerStats ??= {}
            playalist.totalPlayers[insight].playerStats.Assists ??= 0
            playalist.totalPlayers[insight].playerStats.Assists += 1
            gametime.at(-1).push(`${look.wallet}-As`)
            document.getElementById("lastSeen").innerText = ""
            document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
            playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
            window.seam.UpdateStats(playalist)
        }

        digB.onclick = () => {
            playalist.totalPlayers[insight].playerStats ??= {}
            playalist.totalPlayers[insight].playerStats.Digs ??= 0
            playalist.totalPlayers[insight].playerStats.Digs += 1
            gametime.at(-1).push(`${look.wallet}-D`)
            document.getElementById("lastSeen").innerText = ""
            document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
            playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
            window.seam.UpdateStats(playalist)
        }

        if (pos >= 2 && pos < 5){
            const blockB = document.createElement("button")
            blockB.innerText = "Block"

            blockB.onclick = () => {
                playalist.totalPlayers[insight].playerStats ??= {}
                playalist.totalPlayers[insight].playerStats.Blocks ??= 0
                playalist.totalPlayers[insight].playerStats.Blocks += 1
                gametime.at(-1).push(`${look.wallet}-B`)
                document.getElementById("lastSeen").innerText = ""
                document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
                playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                window.seam.UpdateStats(playalist)
                setCheck(playalist.scorebookScrim.at(-1).score)
            }
            rowed.appendChild(blockB)
        } else if(lookUp.indexOf(look) == 0) {
            const aceB = document.createElement("button")
            aceB.innerText = "Ace"
            const servicePointB = document.createElement("button")
            servicePointB.innerText = "Service Point"

            aceB.onclick = () => {
                // COME HERE BB
                let server = playalist.totalPlayers.findIndex(pp => pp.player === document.getElementById("1").querySelector("p").innerText)
                console.log(playalist.totalPlayers.findIndex(pp => pp.player === tok))
                // playalist.totalPlayers[insight]
                playalist.totalPlayers[insight].playerStats ??= {}
                playalist.totalPlayers[insight].playerStats.Aces ??= 0
                playalist.totalPlayers[insight].playerStats.Aces += 1
                gametime.at(-1).push(`${look.wallet}-Ace`)
                document.getElementById("lastSeen").innerText = ""
                document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
                playalist.totalPlayers[server].playerStats.ServicePoints ??= 0
                playalist.totalPlayers[server].playerStats.ServicePoints += 1
                playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                playalist.scorebookScrim[playalist.scorebookScrim.length - 1].score[0] += 1
                document.getElementById("scoreboardX2").innerText = `${playalist.scorebookScrim.at(-1).score[0]} - ${playalist.scorebookScrim.at(-1).score[1]} `
                redo(true)
                window.seam.UpdateStats(playalist)
                setCheck(playalist.scorebookScrim.at(-1).score)
            }

            servicePointB.onclick = () => {
                playalist.totalPlayers[insight].playerStats ??= {}
                playalist.totalPlayers[insight].playerStats.ServicePoints ??= 0
                playalist.totalPlayers[insight].playerStats.ServicePoints += 1
                gametime.at(-1).push(`${look.wallet}-SP`)
                document.getElementById("lastSeen").innerText = ""
                document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
                playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
                window.seam.UpdateStats(playalist)
                setCheck(playalist.scorebookScrim.at(-1).score)
            }
            rowed.appendChild(aceB)
            rowed.appendChild(servicePointB)
        }
        rowed.appendChild(killB)
        rowed.appendChild(assistB)
        rowed.appendChild(digB)
        tempLineUp.push(look)
    })
    lineUp = tempLineUp
}

function rotate(lineUp){
    let heldPlayer = lineUp.shift()
    lineUp.push(heldPlayer)
    console.log(lineUp[3])
    // let libs = playalist.totalPlayers.Libero
    // if (lineUp.findIndex(p => libs.find(lib => lib.player === p)) == 3){
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
    if (lineUp[3].position === "Libero"){
        let libTemp = lineUp[3]
        lineUp[3] = midSwitch
        midSwitch = lineUp[0]
        lineUp[0] = libTemp
    }
    console.log(lineUp)
    gametime.at(-1).push(`${lineUp[0].wallet} - Serve Start`)
    document.getElementById("lastSeen").innerText = ""
    document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
    playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
    window.seam.UpdateStats(playalist)
    foSho(lineUp)
}

window.seam.onHandshake((data) => {
    console.log("h")
    finalLineUp = data
    libs = finalLineUp.lastSetup.find(bp => bp.position === "Libero")
    if (finalLineUp != undefined){
        console.log(finalLineUp)
        document.getElementById("rotateSignal").hidden = false
        lineUp = finalLineUp.lastSetup
        // midSwitch = finalLineUp[6]
        // lineUp.splice(-1, 1)
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
        libs = playalist.lastSetup.find(bp => bp.position === "Libero")
        console.log(libs)
        playalist.scorebookScrim.push({
            "gameDay": date,
            "gameRec": [],
            "score": [0, 0],
            "lead": [0, 0]
        })
        if (playalist.lastSetup != undefined){
            if(playalist.lastSetup[6]){
                // midSwitch = playalist.lastSetup[6]
                // let currentSetUp = [playalist.lastSetup]
                // currentSetUp.splice(-1, 1)
                // console.log(currentSetUp)
                // document.getElementById("vorets").innerText = currentSetUp
                // lineUp = currentSetUp
                foSho(playalist.lastSetup)
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
        if (playalist.teamName === "Team Doe" || !playalist.teamName){
            alert("No team name has been set. A team name will be set now.")
            while (playalist.teamName == "Team Doe"){
                let pp = window.seam.fetchRoster()
                if (pp.teamName !== "Team Doe") break
                let namedTeam = prompt("What is your team name?")
                if (namedTeam !== null){
                    window.seam.UpdateTeamName(namedTeam)
                } else {
                    alert("You have not set a team name. Your team name must be set before continuing with the app. Please set your team name now.")
                }
            }
        }
        gametime ??= []
        gametime.push([])
        gametime.at(-1).push(`${lineUp[0].wallet} - Serve Start`)
        document.getElementById("lastSeen").innerText = ""
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
        window.seam.UpdateStats(playalist)
    })

    document.getElementById("rotateSignal").hidden = false
    await window.seam.UpdateStats(playalist)
    playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec ??= []
    gametime = playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec


    let balled = "no"
    document.getElementById("nored").onclick = () => {
        window.seam.blow()
        console.log(playalist.totalPlayers)
        window.seam.som(playalist.totalPlayers)
        document.getElementById("nored").hidden = true
    }

    serviceErrB.onclick = () => {
        let server = playalist.totalPlayers.findIndex(se => se.player == document.getElementById("1").querySelector("p").innerText)
        gametime.at(-1).push(`${server.player}-ServeErr`)
        redo(false)
        console.log(playalist.totalPlayers)
        console.log(document.getElementById("1").querySelector("p").innerText)
        console.log(server)
        playalist.totalPlayers[server].playerStats ??= {}
        playalist.totalPlayers[server].playerStats.ServeErr ??= 0
        playalist.totalPlayers[server].playerStats.ServeErr += 1
        document.getElementById("lastSeen").innerText = ""
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].score[1] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebookScrim.at(-1).score[0]} - ${playalist.scorebookScrim.at(-1).score[1]} `
        window.seam.UpdateStats(playalist)
        setCheck(playalist.scorebookScrim.at(-1).score)
    }

    document.getElementById("rotateSignal").onclick = () => rotate(lineUp)

    document.getElementById("pointLost").onclick = () => {
        gametime.at(-1).push("PL")
        document.getElementById("lastSeen").innerText = ""
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
        redo(false)
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].score[1] += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebookScrim.at(-1).score[0]} - ${playalist.scorebookScrim.at(-1).score[1]} `
        window.seam.UpdateStats(playalist)
        setCheck(playalist.scorebookScrim.at(-1).score)
    }

    document.getElementById("pointGained").onclick = () => {
        let server = playalist.totalPlayers.findIndex(pp => pp.player === document.getElementById("1").querySelector("p").innerText)
        gametime.at(-1).push("PG")
        document.getElementById("lastSeen").innerText = ""
        document.getElementById("lastSeen").innerText = gametime[gametime.length - 1].at(-1)
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].gameRec = gametime
        playalist.scorebookScrim[playalist.scorebookScrim.length - 1].score[0] += 1
        playalist.totalPlayers[server].playerStats.ServicePoints ??= 0
        playalist.totalPlayers[server].playerStats.ServicePoints += 1
        document.getElementById("scoreboardX2").innerText = `${playalist.scorebookScrim.at(-1).score[0]} - ${playalist.scorebookScrim.at(-1).score[1]} `
        redo(true)
        window.seam.UpdateStats(playalist)
        setCheck(playalist.scorebookScrim.at(-1).score)
    }

    document.getElementById("dispatch").onclick = () => {
        window.seam.blow()
    }

    // document.getElementById("rollingThunder").onclick = () => {
        
    // }

    document.getElementById("overwatch").onclick = () => {
        if (gametime.at(-1) == "PL"){
            playalist.scorebookScrim.at(-1).score[1] -= 1
        } else if (gametime.at(-1).includes("K") || gametime.at(-1).includes("Ace")|| gametime.at(-1).includes("PG")){
            playalist.scorebookScrim.at(-1).score[0] -= 1
        }
        if (gametime.at(-1).includes("Serve End")){
            gametime.splice(-1, 2)
        } else {
           gametime.splice(-1, 1)
        }
    }

    document.getElementById("changer").onclick = () => {
        window.seam.changeScreen(2)
    }

    document.getElementById("SUBBB").onclick = async () => {
        let ided = await window.seam.servingSub()
        console.log(ided)
        if (ided){
            playalist = await window.seam.fetchRoster()
            libs = playalist.lastSetup.find(bp => bp.position === "Libero")
            let og = new Set(lineUp.map(obj => obj.wallet))
            let noOg = new Set(playalist.lastSetup.map(obj => obj.wallet))
            let subbedPlayer = playalist.lastSetup.find(obj => !og.has(obj.wallet) && obj != midSwitch)
            console.log(og, noOg)
            console.log("s", subbedPlayer)
            console.log(lineUp)
            // console.log("h", lineUp[lineUp.indexOf(lineUp.find(obj => !noOg.has(obj.wallet)))], lineUp.indexOf(lineUp.find(obj => !noOg.has(obj.wallet))))
            lineUp[lineUp.indexOf(lineUp.find(obj => !noOg.has(obj.wallet)))] = subbedPlayer
            console.log(playalist, lineUp)
            foSho(lineUp)
        }
    }
    // function resizeUI() {
    //     document.body.style.zoom = window.innerWidth / 1200;
    // }

    // window.addEventListener("resize", resizeUI);
    // resizeUI();
})