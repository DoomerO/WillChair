function tilt(e:any, m:number){
    if(!e.target.mov){e.target.mov = [0, 0]}
    e.target.mov[0] += e.movementX
    e.target.mov[1] += e.movementY
    e.target.style.transition = "0ms"
    e.target.style.transform = `rotateX(${e.target.mov[1] * m}deg)`
    e.target.style.transform += `rotateY(${-e.target.mov[0] * m}deg)`
}
function tiltXY(e:any, mx:number, my:number){
    if(!e.target.mov){e.target.mov = [0, 0]}
    e.target.mov[0] += e.movementX
    e.target.mov[1] += e.movementY
    e.target.style.transition = "0ms"
    e.target.style.transform = `rotateX(${e.target.mov[1] * my}deg)`
    e.target.style.transform += `rotateY(${-e.target.mov[0] * mx}deg)`
}
function reCenter(e:any){
    e.target.mov = [0, 0]
    e.target.style.transform = ""
    e.target.style.transition = "1s"
}

export {tilt, tiltXY, reCenter}