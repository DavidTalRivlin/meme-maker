'use strict'


var gImgs = []

_createGallery()

function getImgById(imgId) {
    return gImgs.find((img)=>imgId === img.id)
}

/******* private functions ********/

function _createImg(id, keywords) {
    return {
        id,
        url: `./img/meme-imgs-square/${id}.jpg`,
        keywords: keywords || ['nice', 'funny'],
    }
}


function _createGallery() {
    gImgs = [
        _createImg(1, ['funny', 'cat']),
        _createImg(2, ['funny', 'cat']),
        _createImg(3, ['funny', 'cat']),
        _createImg(4, ['funny', 'cat']),
        _createImg(5, ['funny', 'cat']),
        _createImg(6, ['funny', 'cat']),
        _createImg(7, ['funny', 'cat']),
        _createImg(8, ['funny', 'cat']),
        _createImg(9, ['funny', 'cat']),
        _createImg(10, ['funny', 'cat']),
        _createImg(11, ['funny', 'cat']),
        _createImg(12, ['funny', 'cat']),
        _createImg(13, ['funny', 'cat']),
        _createImg(14, ['funny', 'cat']),
        _createImg(15, ['funny', 'cat']),
        _createImg(16, ['funny', 'cat']),
        _createImg(17, ['funny', 'cat']),
        _createImg(18, ['funny', 'cat']),
    ]
}

