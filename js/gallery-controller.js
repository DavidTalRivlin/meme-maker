'use strict'

function onInitGallery() {
    renderGallery()

}

function renderGallery() {

    var elGallery = document.querySelector('.img-section')
    var strHtml = ''

    gImgs.forEach(img => {
        strHtml +=
            `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`
    });

    elGallery.innerHTML = strHtml
}

function onImgSelect(id) {

    
    setImg(id)
    renderMeme()
}