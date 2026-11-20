let oppTeam
let holding
let oppoHolding
let pos

let libbaUno
let libbaDos

function formationLap(teamed, side, opposite){
    switch (side){
        case 1:
            holding = document.getElementById("LINE2")
            oppoHolding = document.getElementById("LINE")
        case 0:
            holding = document.getElementById("LINE")
            oppoHolding = document.getElementById("LINE2")
    }
    console.log(holding, oppoHolding)
    console.log(teamed)
    teamed.forEach((item, index) => {
        console.log(item, index)
        if (index == 6) return

        const name = document.createElement('p')
        name.innerText = item.wallet

        switch (side){
            case 1:
                pos = Number(`${index + 1}2`)
            case 0:
                pos = index + 1
        }

        const containerRowed = document.createElement('div')
        document.getElementById(String(pos)).appendChild(containerRowed)

        if (pos < 2 || pos > 4 && pos < 7){
            let libShine = document.createElement('button')
            libShine.innerText = "Lib Sub"

            libShine.onclick = () => {
                let libbed = teamed.find(bp => bp.position === "Libero")
                libbaUno = item
                item = libbed
                libShine.hidden = true
                name.innerText = libbed.wallet
            }
        }

    })
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("hello world")
    let sided = await window.seam.setCourtView()
    oppTeam = await window.seam.getOppoTeam()
    console.log(oppTeam)
    console.log(sided)
    await window.seam.fetchRoster().then((data) => {
        let bigBoys = data
        // bigBoys.lastSetup[6] = 
        console.log(bigBoys)
        // formationLap(bigBoys.lastSetup, sided, oppTeam)
    })
})