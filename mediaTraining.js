let oppTeam

function formationLap(teamed, side){
    console.log(teamed)
    teamed.array.forEach((item, index) => {
        console.log(item, index)
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
        console.log(bigBoys)
        // formationLap(bigBoys.lastSetup, sided)
    })
})