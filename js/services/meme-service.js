'use strict'
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I think I\'ve got this sprint...', size: 30, color: 'white', fill: 'black', font: 'Impact', isDrag: false },
        { txt: 'wrong', size: 50, color: 'white', fill: 'black', font: 'Impact', isDrag: false },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLineText(txt) {
    getSelectedLine().txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setFontSize(value) {
    var currLine = getSelectedLine();

    (value === '+') ? currLine.size++ : currLine.size--
}

function setFillColor(value) {

    getSelectedLine().fill = value
    setClrtoClrBtn('btn-fill-color')
}

function setOutlineColor(value) {
    getSelectedLine().color = value
    setClrtoClrBtn('btn-stroke-color')
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setDragToLines(isDrag){
    gMeme.lines.forEach((line)=>line.isDrag=isDrag)
}

function addLine() {
    gMeme.lines.push({ txt: 'You have too much to say!', size: 30, color: 'white', fill: 'black', font: 'Impact', isDrag: false })
}

function switchLine(idx) {
    if (idx>=0) {
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

function getTextBoundry(){
    return gCtx.measureText(getSelectedLine().txt) 
}

function setClrtoClrBtn(btn){
    
    const btnClass = (btn === 'btn-fill-color') ?  '.btn-fill-color' : '.btn-stroke-color'
    const btnType = (btn === 'btn-fill-color')? 'fill' : 'color' 
    const elBtn = document.querySelector(btnClass)
    
    elBtn.style.backgroundColor = getSelectedLine()[btnType] 


}

function highlightLine() {
    let {pos,size} = getSelectedLine()
    let {width} = getTextBoundry()
     
    let xStart = pos.x-(width/2)
    let yStart = pos.y-(size/2)

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.beginPath()
    gCtx.rect(xStart,yStart,width,size)
    gCtx.stroke()
}

function setTextPos(x, y, lineIdx) {
    gMeme.lines[lineIdx]['pos'] = { x, y }
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    switchLine()
}

function alignTextLeft() {
    getSelectedLine().pos.x = ((getTextBoundry().width) / 2) + 10
}

function alignTextCenter() {
    getSelectedLine().pos.x = gElCanvas.width / 2

}

function alignTextRight() {
    getSelectedLine().pos.x = gElCanvas.width - ((getTextBoundry().width) / 2) - 10

}

function getTextPos() {
    let currLine = gMeme.selectedLineIdx
    return (currLine.lines.pos)

}

function moveLineDown() {
    getSelectedLine().pos.y += 10
}

function moveLineUp() {
    getSelectedLine().pos.y -= 10
}

function setFontFamily(value) {
    getSelectedLine().font = value
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
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function setLineDrag(isDrag) {
    getSelectedLine().isDrag = isDrag
}

function moveLine(dx, dy) {
    let currLine = getSelectedLine()
    currLine.pos.x += dx
    currLine.pos.y += dy
}
