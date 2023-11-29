'use strict'

function onInitGallery() {
    renderGallery()

}

function renderGallery() {

    var elGallery = document.querySelector('.img-section')
    var strHtml = ''

    gImgs.forEach(img => {
        strHtml +=
            `<img src="${img.url}" data-id="${img.id}" alt="" onclick="onImgSelect(this)">`
    });

    elGallery.innerHTML = strHtml
}

function onImgSelect(elImg) {

    var imgId = elImg.dataset.id
    setImg(imgId)
    renderMeme()
}