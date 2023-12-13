'use stirct'
let gElCanvas
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
gIsMouseDrag = false

function onInitMeme() {

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    setInputVal()
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

    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)

    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onSetFontFamily(ev) {
    setFontFamily(ev.target.value)
    renderMeme()
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
            if (line.isDrag || !line.pos) {
                if (idx === 0) {
                    x = gElCanvas.width / 2
                    y = 30
                } else if (idx === 1) {
                    x = gElCanvas.width / 2
                    y = gElCanvas.height - 30
                } else {
                    x = gElCanvas.width / 2
                    y = gElCanvas.height / 2
                }
            } else {
                x = line.pos.x
                y = line.pos.y
            }

            setTextPos(x, y, idx)
            renderText(line, x, y, idx)
        });
        highlightLine()
        setClrtoClrBtn('btn-stroke-color')
        setClrtoClrBtn('btn-fill-color')
        setDragToLines(false)
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
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
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
    switchLine(getMeme().lines.length-1)
}

function onSwitchLine(idx) {
    switchLine(idx)
    setInputVal()
}

function setInputVal() {
    var elText = document.querySelector('.line-value')
    elText.value = getSelectedLine().txt
}

function resizeCanvas() {
    setDragToLines(true)
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
    getSelectedLine().isDrag = true
    alignTextLeft()
    getSelectedLine().isDrag = false
    renderMeme()

}

function onAlignTextCenter() {
    getSelectedLine().isDrag = true
    alignTextCenter()
    getSelectedLine().isDrag = false
    renderMeme()
}

function onAlignTextRight() {
    getSelectedLine().isDrag = true
    alignTextRight()
    getSelectedLine().isDrag = false
    renderMeme()
}

function onMoveLineDown() {
    getSelectedLine().isDrag = true
    moveLineDown()
    getSelectedLine().isDrag = false
    renderMeme()
}

function onMoveLineUp() {
    getSelectedLine().isDrag = true
    moveLineUp()
    getSelectedLine().isDrag = false
    renderMeme()
}

function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// still under working:
function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)

    let clickedlineIdx = gMeme.lines.findIndex((line) => isLineClicked(pos, line))

    if (clickedlineIdx === -1) return

    onSwitchLine(clickedlineIdx)
    renderMeme()
    // setLineDrag(true)
    gIsMouseDrag = true

    gStartPos = pos
    gElCanvas.style.cursor = 'grabbing'

}

function onMove(ev) {
    

    // if (getSelectedLine().isDrag) return
    if (!gIsMouseDrag) return

    const pos = getEvPos(ev)

    // Calc the delta, the diff we moved
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = getSelectedLine().pos
    // The canvas is render again after every move
    
    
    renderMeme()
}

function onUp() {
    gIsMouseDrag = false
    gElCanvas.style.cursor =  'grab'
}

function isLineClicked(clickedPos, line) {

    let x = line.pos.x
    let y = line.pos.y
    let mouseX = clickedPos.x;
    let mouseY = clickedPos.y;
    let widthAddon = gCtx.measureText(line.txt).width / 2
    let heightAddon = line.size / 2


    if (mouseX <= x + widthAddon &&
        mouseX >= x - widthAddon &&
        mouseY <= y + heightAddon &&
        mouseY >= y - heightAddon) {
        return true
    } else {
        return false
    }
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}