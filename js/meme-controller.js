'use stirct'
let gElCanvas


let gFillColor = 'white'
let gOutlineColor = 'black'


function onInitMeme() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()


}


function renderMeme() {
    const { selectedImgId, lines } = getMeme()
    renderImg(selectedImgId, lines)

}


function renderImg(imgId, lines) {
    const elImg = new Image()
    elImg.src = `../img/meme-imgs-square/${imgId}.jpg`

    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            let x
            let y
            if (idx === 0) {
                x = gElCanvas.width / 2
                y = 100
            } else if (idx === 1) {
                x = gElCanvas.width / 2
                y = gElCanvas.height - 100
            } else {
                x = gElCanvas.width / 2
                y = gElCanvas.height / 2
            }
            renderText(line, x, y)
        });



    }
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function renderText(line, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = line.fill
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}


function onSetLineText(ev) {
    const txt = ev.target.value
    console.log(txt)
    setLineText(txt)
    renderMeme()
}

function onSetFillColor(ev) {
    gFillColor = ev.target.value

}


function onSetOutlineColor(ev) {
    gOutlineColor = ev.target.value
}
