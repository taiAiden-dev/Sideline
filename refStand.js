let temp
let pos
let see = false
let playerToSub
let playerToPlay
let placeheld = document.getElementById("okaysee").innerText

function subs(data){
    if (see){
        let totalView = data
        document.getElementById("rostered").innerHTML =""
        totalView.totalPlayers.forEach(bp => {
            let lok = document.createElement("li")
            let toDo = document.createElement("button")

            toDo.innerText = bp.player

            toDo.onclick = () => {
                document.getElementById("okaysee").innerText = `${placeheld} ${bp.player}`
                playerToPlay = bp.player
            }
            lok.appendChild(toDo)
            document.getElementById("rostered").appendChild(lok)
        })
    } else {
        let totalView = data
        document.getElementById("rostered").innerHTML =""
        totalView.lastSetup.forEach(bp => {
            let lok = document.createElement("li")
            let toDo = document.createElement("button")

            toDo.innerText = bp.wallet

            toDo.onclick = () => {
                document.getElementById("okaysee").innerText = `${placeheld} ${bp.wallet}`
                playerToSub = bp.wallet
            }
            lok.appendChild(toDo)
            document.getElementById("rostered").appendChild(lok)
        })
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    let placeheld = document.getElementById("okaysee").innerText
    await window.seam.fetchRoster().then((data) => {
        temp = data
        subs(data)
    })
    // document.getElementById("rostered")

    document.getElementById("toConfirm").onclick = async () => {
        if (!see){
            if (!playerToSub) {
                alert("player pick please a")
            } else {
                see = true
                document.getElementById("pos").hidden = false
                document.getElementById("okaysee").innerText = "Player to sub:"
                placeheld = document.getElementById("okaysee").innerText
                subs(temp)
            }
        } else {
            if (!playerToPlay || !document.getElementById("pos")) {
                alert("player pick please a")
            } else {
                see = false
                let sub1 = temp.totalPlayers.find(bp => bp.player === playerToPlay)
                let sub2 = temp.lastSetup.find(bp => bp.wallet === playerToSub)
                let subbed = {
                    wallet: sub1.player,
                    position: document.getElementById("pos").value
                }
                temp.lastSetup[temp.lastSetup.indexOf(sub2)] = subbed
                console.log(temp)
                console.log(sub1, sub2, subbed)
                await window.seam.UpdateStats(temp)
                window.close()
            }
        }
    }
})