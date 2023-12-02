'use stirct'
let gElCanvas
gIsLineMove = false


function onInitMeme() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    SetInputVal()
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

    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)

    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
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

function onMoveLineDown() {
    gIsLineMove = true
    moveLineDown()
    renderMeme()
}

function onMoveLineUp() {
    gIsLineMove = true
    moveLineUp()
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


// function onDown(ev) {
//     // Get the ev pos from mouse or touch
//     const pos = getEvPos(ev)
//     let clickedLineIdx
//     gMeme.lines.forEach((line, idx) => {
//         clickedLineIdx = isLineClicked(pos, idx)
//         if (clickedLineIdx) {
//             gMeme.selectedLineIdx = clickedLineIdx
//             renderMeme()
//         }
//     })
//     // if (!isLineClicked(pos)) return

//     // setCircleDrag(true)
//     //Save the pos we start from
//     // gStartPos = pos
//     // document.body.style.cursor = 'grabbing'
// }

// function isLineClicked(clickedPos, idx) {
//     // let rect = gElCanvas.getBoundingClientRect();
//     // console.log('rect', rect)
//     // console.log('clickedPos', clickedPos)
//     let mouseX = clickedPos.x;
//     // let mouseX = clickedPos.x - rect.left;
//     let mouseY = clickedPos.y;
//     // let mouseY = clickedPos.y - rect.top;
//     let x = gMeme.lines[idx].pos.x
//     let y = gMeme.lines[idx].pos.y

//     let width = gMeme.lines[idx].width
//     let height = gMeme.lines[idx].size

//     console.log('mouseX', mouseX)
//     console.log('mouseY', mouseY)
//     console.log('x', x)
//     console.log('y', y)


//     if (
//         mouseX >= x
//         &&
//         mouseX <= x + width) {
//         console.log('inside line')
//     }
//     //  &&
//     // mouseY >= y - height/2 &&
//     // mouseY <= height/2) {

//     return idx;
//     // }
// }


// function getEvPos(ev) {

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

//     // if (TOUCH_EVS.includes(ev.type)) {
//     //     // Prevent triggering the mouse ev
//     //     ev.preventDefault()
//     //     // Gets the first touch point
//     //     ev = ev.changedTouches[0]
//     //     // Calc the right pos according to the touch screen
//     //     pos = {
//     //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//     //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//     //     }
//     // }
//     return pos
// }