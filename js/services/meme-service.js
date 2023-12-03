'use strict'
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I think i got this sprint...', size: 30, color: 'white', fill: 'black', font: 'Impact' },
        { txt: 'wrong', size: 50, color: 'white', fill: 'black', font: 'Impact' }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLineText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setFontSize(value) {
    (value === '+') ? gMeme.lines[gMeme.selectedLineIdx].size++ : gMeme.lines[gMeme.selectedLineIdx].size--
}

function setFillColor(value) {

    gMeme.lines[gMeme.selectedLineIdx].fill = value
}

function setOutlineColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function addLine() {
    gMeme.lines.push({ txt: '3line', size: 30, color: 'white', fill: 'black', font: 'Impact' })
}

function switchLine(idx) {
    if (idx) {
        gMeme.selectedLineIdx = idx
    } else {
        if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
            gMeme.selectedLineIdx++
        } else {
            gMeme.selectedLineIdx = 0
        }
    }

    renderMeme()
}

function highlightLine() {


    var currLine = gMeme.lines[gMeme.selectedLineIdx]

    gCtx.beginPath();

    var x = currLine.pos.x
    var y = currLine.pos.y

    gCtx.moveTo(
        x - currLine.boundry.xLeft - 5,
        y - currLine.boundry.yTop - 5
    );
    gCtx.lineTo(
        x + currLine.boundry.xRight + 5,
        y - currLine.boundry.yTop - 5
    );
    gCtx.lineTo(
        x + currLine.boundry.xRight + 5,
        y + currLine.boundry.yBottom + 5
    );
    gCtx.lineTo(
        x - currLine.boundry.xLeft - 5,
        y + currLine.boundry.yBottom + 5
    );
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 1
    gCtx.closePath();
    gCtx.stroke();
}

function getTextValue() {
    return gMeme.lines[gMeme.selectedLineIdx].txt


}

function setTextPos(x, y, lineIdx) {
    gMeme.lines[lineIdx]['pos'] = { x, y }
}

function setTextBoundry(lineIdx) {
    var { actualBoundingBoxRight, actualBoundingBoxLeft, actualBoundingBoxAscent, actualBoundingBoxDescent } = getTextBoundry(lineIdx)
    gMeme.lines[lineIdx]['boundry'] = {
        xLeft: actualBoundingBoxLeft,
        xRight: actualBoundingBoxRight,
        yTop: actualBoundingBoxDescent,
        yBottom: actualBoundingBoxAscent
    }
}

function getTextBoundry(lineIdx = gMeme.selectedLineIdx) {
    return gCtx.measureText(gMeme.lines[lineIdx].txt)

}

function deleteLine() {
    if (gMeme.lines.length === 0) return

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function alignTextLeft() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = ((getTextBoundry().width) / 2) + 10
}

function alignTextCenter() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 2

}

function alignTextRight() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - ((getTextBoundry().width) / 2) - 10

}

function getTextPos() {
    let currLine = gMeme.selectedLineIdx
    return (currLine.lines.pos)

}

function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += 10
}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10
}

function setFontFamily(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}



function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
