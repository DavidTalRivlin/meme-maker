'use strict'

var gImgs = [
    { id: 1, url: 'img/meme-imgs-square/1.jpg', keywords: ['funny', 'cat']},
    { id: 2, url: 'img/meme-imgs-square/2.jpg', keywords: ['notfunny', 'notcat'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 30, color: 'red' , fill:'black', textAlign:'center' },
        { txt: 'I dont like the 2nd row', size: 30, color: 'white' , fill:'black', textAlign:'center'}
        ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme(){
 return gMeme   
}


function setLineText(txt){
    console.log (txt, 'setlinetext')
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId){
    gMeme.selectedImgId = imgId
}