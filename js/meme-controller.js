'use stirct'
let gElCanvas
gIsLineMove = false


function onInitMeme() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    SetInputVal()
    // renderMeme()
    setEventListener()

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

    window.addEventListener('resize', () => {
        resizeCanvas()
    })

}

function renderImg(imgId, lines) {

    const elImg = new Image()
    var img = getImgById(imgId)
    elImg.src = img.url

    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        if (!lines.length) return
        lines.forEach((line, idx) => {
            let x
            let y
            if (!gIsLineMove) {
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
            } else {
                x = gMeme.lines[idx].pos.x
                y = gMeme.lines[idx].pos.y
            }
            
            
            renderText(line, x, y, idx)
            highlightLine()

        });
        gIsLineMove = false
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
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = 'center'
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
    SetInputVal()
}

function SetInputVal() {
    var elText = document.querySelector('.line-value')
    elText.value = getTextValue()
}

function resizeCanvas() {
    gIsLineMove = false
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight //saved for diffret aspet ratio
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function openColorPicker(elBtn) {
    const elInput = elBtn.querySelector('input')
    elInput.click()
}

function onAlignTextLeft() {
    gIsLineMove = true
    alignTextLeft()
    renderMeme()

}

function onAlignTextCenter() {
    gIsLineMove = true
    alignTextCenter()
    renderMeme()
}

function onAlignTextRight() {
    gIsLineMove = true
    alignTextRight()
    renderMeme()
}

function onMoveLineDown(){
    gIsLineMove = true
    moveLineDown()
    renderMeme()
}

function onMoveLineUp(){
    gIsLineMove = true
    moveLineUp()
    renderMeme()
    
}
