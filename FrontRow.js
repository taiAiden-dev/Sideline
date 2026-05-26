let lineUp
let finalLineUp
let midSwitch

let playalist

function foSho(lineUp){
    lineUp.forEach(look => {
        let tok = String(look)
        let pos = lineUp.indexOf(look) + 1
        console.log(document.getElementById(String(pos)))
        document.getElementById(String(pos)).innerText = look
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
            window.seam.UpdateStats(playalist)
        }

        assistB.onclick = () => {
            playalist.playerStats[tok] ??= {}
            playalist.playerStats[tok].Assists ??= 0
            playalist.playerStats[tok].Assists += 1
            window.seam.UpdateStats(playalist)
        }

        digB.onclick = () => {
            playalist.playerStats[tok] ??= {}
            playalist.playerStats[tok].Digs ??= 0
            playalist.playerStats[tok].Digs += 1
            window.seam.UpdateStats(playalist)
        }
        if (pos >= 2 && pos < 5){
            const blockB = document.createElement("button")
            blockB.innerText = "Block"

            blockB.onclick = () => {
                playalist.playerStats[tok] ??= {}
                playalist.playerStats[tok].Blocks ??= 0
                playalist.playerStats[tok].Blocks += 1
                window.seam.UpdateStats(playalist)
            }
            rowed.appendChild(blockB)
        } else if(lineUp.indexOf(look) == 0) {
            const aceB = document.createElement("button")
            aceB.innerText = "Ace"
            const serviceErrB = document.createElement("button")
            serviceErrB.innerText = "Service Error"

            aceB.onclick = () => {
                playalist.playerStats[tok] ??= {}
                playalist.playerStats[tok].Aces ??= 0
                playalist.playerStats[tok].Aces += 1
                window.seam.UpdateStats(playalist)
            }

            serviceErrB.onclick = () => {
                playalist.playerStats[tok] ??= {}
                playalist.playerStats[tok].ServeErr ??= 0
                playalist.playerStats[tok].ServeErr += 1
                window.seam.UpdateStats(playalist)
            }
            rowed.appendChild(aceB)
            rowed.appendChild(serviceErrB)
        }
        rowed.appendChild(killB)
        rowed.appendChild(assistB)
        rowed.appendChild(digB)
    })
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
        document.getElementById("vorets").innerText = finalLineUp
        console.log(lineUp)
        console.log(midSwitch)
        foSho(lineUp)
    } else {
        console.error("fork")
    }
})
document.addEventListener("DOMContentLoaded", async () => {


    console.log("balls")
    playalist = await window.seam.fetchRoster()
    console.log(playalist)
    if(playalist.lastSetup[6]){
        midSwitch = playalist.lastSetup[6]
        playalist.lastSetup.splice(-1, 1)
        document.getElementById("vorets").innerText = playalist.lastSetup
        foSho(playalist.lastSetup)
    }


// //let , , , , ,
// let lib
// if (playalist.Libero){
//     lib = true
// } else {
//     lib = false
// }

// let posOne //= playalist.Setter[0]
// let posTwo //= playalist.OutsideHitter[0]
// let posThree //= playalist.MiddleBlocker[0]
// let posFour //= playalist.OppositeHitter[0]
// let posFive //= playalist.OutsideHitter[1]
// let posSix //= playalist.MiddleBlocker[1]
// // let lineUp = [] //= [posOne, posTwo, posThree, posFour, posFive, posSix]
// // window.seam.refine(playalist.OutsideHitter, 2)
//             // chonk = window.seam.refine(null, 1)


function rotate(){
    let heldPlayer = lineUp.shift()
    lineUp.push(heldPlayer)
    console.log(lineUp[3])
    console.log(lineUp[3] == playalist.totalPlayers.Libero.filter(item => lineUp.includes(item)))
    if (lineUp[3] == playalist.totalPlayers.Libero.filter(item => lineUp.includes(item))){
        // let libTemp = lineUp.splice(3, 1)[0]
        // lineUp.shift()
        // lineUp.push(libTemp)
        let libTemp = lineUp[3]
        lineUp[3] = midSwitch
        midSwitch = lineUp[0]
        lineUp[0] = libTemp
    }
    console.log(lineUp)
    lineUp.forEach(look => {
        console.log(lineUp.indexOf(look) >= 2 && lineUp.indexOf(look) < 5)
        if (lineUp.indexOf(look) >= 1 && lineUp.indexOf(look) < 4){
            let pos = lineUp.indexOf(look) + 1
            document.getElementById(String(pos)).innerText = look
        } else {
            console.log("wait", lineUp.indexOf(look))
            let pos = lineUp.indexOf(look) + 1
            document.getElementById(String(pos)).innerText = look
        }
    })
    foSho(lineUp)
}


    // window.seam.test()
    let balled = "no"
    document.getElementById("nored").onclick = () => {
        // window.seam.refine(playalist.OutsideHitter, false)
        window.seam.blow()
        console.log(playalist.totalPlayers)
        window.seam.som(playalist.totalPlayers)
        // setUpLineUp()
        document.getElementById("nored").hidden = true
    }

    document.getElementById("rotateSignal").onclick = () => rotate()
})