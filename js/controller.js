'use stirct'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}


function renderMeme() {
    renderImg()
}

function renderImg() {
    const elImg = new Image()
    elImg.src = '../img/meme-imgs (square)/1.jpg'

    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText('hello', 250, 100)

    }
}

// function onRenderText(ev){
//     const { offsetX, offsetY } = ev
//     renderText('Hello', offsetX, offsetY)
// }

function renderText(text, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
