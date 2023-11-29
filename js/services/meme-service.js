'use strict'

var gImgs = [
    { id: 1, url: 'img/meme-imgs-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/meme-imgs-square/2.jpg', keywords: ['notfunny', 'notcat'] }
]

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
    Me
    gMeme.lines[gMeme.selectedLineIdx].fill = value
}


function setOutlineColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}


function addLine() {
    gMeme.lines.push({ txt: '3line', size: 30, color: 'red', fill: 'black', textAlign: 'center' },)
}


function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length) {
        gMeme.selectedLineIdx++
    } else {
        gMeme.selectedLineIdx = 0
    }
}
   
//    function highlightLine(){

//        const textMetrics = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt);
//        ctx.beginPath();

//        var x = gElCanvas.width / 2
//        var y = 100
       


//        ctx.moveTo(
//            x - textMetrics.actualBoundingBoxLeft,
//            y - textMetrics.actualBoundingBoxAscent
//        );
//        ctx.lineTo(
//            x + textMetrics.actualBoundingBoxRight,
//            y - textMetrics.actualBoundingBoxAscent
//        );
//        ctx.lineTo(
//            x + textMetrics.actualBoundingBoxRight,
//            y + textMetrics.actualBoundingBoxDescent
//        );
//        ctx.lineTo(
//            x - textMetrics.actualBoundingBoxLeft,
//            y + textMetrics.actualBoundingBoxDescent
//        );
//        ctx.closePath();
//        ctx.stroke();

//    }   

