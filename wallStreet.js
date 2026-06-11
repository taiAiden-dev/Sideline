let temp
let newPlayer
let lineUp = []
let registered = false
let adding = true
const confirmB = document.getElementById("sont")

function sta(temp){
    document.getElementById("viewa").innerText = temp
}

async function setUpLineUp(){
    count = 0
    let allTO = document.createElement("div")
    document.body.appendChild(allTO)
    console.log(allTO)
    while(lineUp.length != 7){
        allTO.innerText = ""
        document.getElementById("viewa").innerText = "No Player Selelcted"
        console.log(count)
        switch (true){
            case (count == 1 || count == 4):
                document.getElementById("clarity").innerText = "Choose your Outside Hitters:"
                // document.getElementById("viewa").innerText = total.OutsideHitter
                total.forEach(b => {
                    if (lineUp.includes(b.player)) return
                    const lok = document.createElement("button")
                    lok.innerText = b.player

                    lok.onclick = () => {
                        temp = lok.innerText
                        // lineUp.push(temped)
                        sta(temp)
                    }
                    allTO.appendChild(lok)
                })
                break
            case (count == 5):
                document.getElementById("clarity").innerText = "Choose your Libero:"
                // document.getElementById("viewa").innerText = total.Libero
                total.forEach(b => {
                    const lok = document.createElement("button")
                    lok.innerText = b.player

                    lok.onclick = () => {
                        temp = lok.innerText
                        // lineUp.push(temped)
                        sta(temp)
                    }
                    allTO.appendChild(lok)
                })
                break
            case (count == 0):
                document.getElementById("clarity").innerText = "Choose your Setter:"
                // document.getElementById("viewa").innerText = total.Setter
                total.forEach(b => {
                    console.log(b.player)
                    const lok = document.createElement("button")
                    lok.innerText = b.player

                    lok.onclick = () => {
                        temp = lok.innerText
                        // lineUp.push(temped)
                        sta(temp)
                    }
                    allTO.appendChild(lok)
                })
                break
            case (count == 3):
                document.getElementById("clarity").innerText = "Choose your Opposite Hitter:"
                // document.getElementById("viewa").innerText = total.OppositeHitter
                total.forEach(b => {
                    const lok = document.createElement("button")
                    lok.innerText = b.player

                    lok.onclick = () => {
                        temp = lok.innerText
                        // lineUp.push(temped)
                        sta(temp)
                    }
                    allTO.appendChild(lok)
                })
                break
            case (count == 2 || count == 6):
                document.getElementById("clarity").innerText = "Choose your Middle Blockers:"
                // document.getElementById("viewa").innerText = total.MiddleBlocker
                total.forEach(b => {
                    if (lineUp.includes(b.player)) return
                    const lok = document.createElement("button")
                    lok.innerText = b.player

                    lok.onclick = () => {
                        temp = lok.innerText
                        sta(temp)
                        // lineUp.push(temped)
                    }
                    allTO.appendChild(lok)
                })
                break
        }

        await new Promise((resolve) => {
            confirmB.onclick = () => {
                if (!temp) throw alert("no (pick a player please)")
                lineUp.push(temp)
                temp = null
                resolve()
            }
        })
        console.log(lineUp)
        if (count < 6){
            count += 1
        } else {
            window.seam.moss(lineUp)
            window.close()
        }
    }
}

async function addPlayer(){
    await new Promise((resolve) => {
        document.getElementById("luigiNooo").onclick = () => {
            let pName = document.getElementById("named").value
            let numTemp = Number(document.getElementById("playerNumber").value)

            let pNum = numTemp
            console.log(pName)
            console.log(pNum)
            if (pName && pNum) {
                newPlayer = {
                    player: pName,
                    jerseyNumber: pNum,
                    playerStats: {}
                }
                registered = true
                resolve()
            }  else {
                alert("hey i think your missing something buddy")
            }
        }
    })
    if (registered){
        console.log(newPlayer)
        window.seam.addPlayer(newPlayer).then(() => {
            window.close()
        })
    }
}


window.seam.onHandshake((data) => {
    adding = false
    console.log(data)
    total = data
    console.log(total)
    setUpLineUp()
})

document.addEventListener("DOMContentLoaded", () => {
    console.log("okay")
    if (adding){
        document.getElementById("setUpLineUped").hidden = true
        document.getElementById("completePt2").hidden = false

        addPlayer()
    }
})