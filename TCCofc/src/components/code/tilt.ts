function tilt(e:any, mx:number, my:number){
    if(!e.target.mov){e.target.mov = [0, 0]}
    e.target.mov[0] += e.movementX
    e.target.mov[1] += e.movementY
    e.target.style.transition = "0ms"
    e.target.style.transform = `rotateX(${e.target.mov[1] * my}deg) rotateY(${-e.target.mov[0] * mx}deg)`
}
function hoverFocus(e:any, m:number, s:number){
    let angle = [e.pageX - e.target.offsetLeft - e.target.offsetWidth / 2, e.pageY - e.target.offsetTop - e.target.offsetHeight / 2]
    e.target.style.scale = s
    e.target.style.transition = "100ms"
    e.target.style.transform = `rotateX(${angle[1] * m}deg) rotateY(${-angle[0] * m}deg)`
}
function reCenter(e:any){
    e.target.mov = [0, 0]
    e.target.style.transform = ""
    e.target.style.transition = "1s"
    e.target.style.scale = "1"
}

export {tilt, hoverFocus, reCenter}