'use strict'
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 30, color: 'red', fill: 'black', textAlign: 'center' },
        { txt: 'I dont like the 2nd row', size: 30, color: 'white', fill: 'black', textAlign: 'center' }
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
    gMeme.lines.push({ txt: '3line', size: 30, color: 'red', fill: 'black',},)
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else {
        gMeme.selectedLineIdx = 0
    }
    
   
    renderMeme()
    // setTimeout(highlightLine, 200)
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

function getTextValue(){
return gMeme.lines[gMeme.selectedLineIdx].txt

    
}

function setTextPos(x, y, lineIdx) {
    gMeme.lines[lineIdx]['pos'] = { x, y }
}

function setTextBoundry(lineIdx) {
    // var box = getTextBoundry(lineIdx)
    var { actualBoundingBoxRight, actualBoundingBoxLeft, actualBoundingBoxAscent, actualBoundingBoxDescent } = getTextBoundry(lineIdx)
    gMeme.lines[lineIdx]['boundry'] = {
        xLeft: actualBoundingBoxLeft,
        xRight: actualBoundingBoxRight,
        yTop: actualBoundingBoxDescent,
        yBottom: actualBoundingBoxAscent
    }
}

function getTextBoundry(lineIdx = gMeme.selectedImgId) {
    return gCtx.measureText(gMeme.lines[lineIdx].txt)

}

function deleteLine(){
    if (gMeme.lines.length === 0) return

    gMeme.lines.splice(gMeme.selectedLineIdx,1)
}

function alignTextLeft(){
    gMeme.lines[gMeme.selectedLineIdx].pos.x = ((getTextBoundry().width)/2) +10  

}
function alignTextCenter(){
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 2  

}
function alignTextRight(){
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width-((getTextBoundry().width)/2) -10 

}

function getTextPos(){
    let currLine = gMeme.selectedLineIdx
    return (currLine.lines.pos)

}

function moveLineDown(){
    gMeme.lines[gMeme.selectedLineIdx].pos.y +=10

}

function moveLineUp(){
    gMeme.lines[gMeme.selectedLineIdx].pos.y -=10
}
