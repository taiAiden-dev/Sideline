let temp
let lineUp = []
const cockcon = document.getElementById("sont")

function sta(temp){
    document.getElementById("viewa").innerText = temp
}

async function setUpLineUp(){
    count = 0
    nort = 0
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
                total.OutsideHitter.forEach(b => {
                    if (lineUp.includes(b)) return
                    const lok = document.createElement("button")
                    lok.innerText = b

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
                total.Libero.forEach(b => {
                    const lok = document.createElement("button")
                    lok.innerText = b

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
                total.Setter.forEach(b => {
                    console.log(b)
                    const lok = document.createElement("button")
                    lok.innerText = b

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
                total.OppositeHitter.forEach(b => {
                    const lok = document.createElement("button")
                    lok.innerText = b

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
                total.MiddleBlocker.forEach(b => {
                    if (lineUp.includes(b)) return
                    const lok = document.createElement("button")
                    lok.innerText = b

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
            cockcon.onclick = () => {
                if (!temp) throw alert("no")
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

window.seam.onHandshake((data) => {
    console.log(data)
    total = data
    console.log(total)
    setUpLineUp()
})

document.addEventListener("DOMContentLoaded", async () => {
    // let pi = await window.seam.refine(null, 1)
    // console.log(pi)




  //     window.seam.refine(document.getElementById("tempChar").value, 2)
})