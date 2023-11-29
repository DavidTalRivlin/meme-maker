'use stirct'
let gElCanvas



function onInitMeme() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    setEventListener()
    showLineTextInValue()

}

function renderMeme() {
    const { selectedImgId, lines } = getMeme()
    renderImg(selectedImgId, lines)

}

function setEventListener() {
    const fillColorPicker = document.querySelector('.fill-color')
    fillColorPicker.addEventListener('input', () => {
        onSetFillColor(fillColorPicker.value)
    });

    const outlineColorPicker = document.querySelector('.outline-color')
    outlineColorPicker.addEventListener('input', () => {
        onSetOutlineColor(outlineColorPicker.value)
    });

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
            renderText(line, x, y, idx)
        });
        highlightLine()
    }
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function renderText(line, x, y, lineIdx) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = line.fill
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)

    setTextPos(x, y, lineIdx)
    setTextBoundry(lineIdx)



}

function onSetLineText(ev) {
    const txt = ev.target.value
    setLineText(txt)
    renderMeme()
}

function onSetFillColor(value) {
    setFillColor(value)
    renderMeme()
}

function onSetOutlineColor(value) {
    setOutlineColor(value)
    renderMeme()
}

function onSetFontSize(value) {
    setFontSize(value)
    renderMeme()

}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    
    switchLine()
    showLineTextInValue()
}

function showLineTextInValue(){
    var elText = document.querySelector('.line-value')
    console.log('elText', elText)
    elText.value = getTextValue()
}