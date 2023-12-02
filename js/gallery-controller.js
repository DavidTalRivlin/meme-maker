'use strict'

function onInitGallery() {
    renderGallery()

}

function renderGallery() {

    var elGallery = document.querySelector('.img-section')
    var strHtml = ''

    gImgs.forEach(img => {
        strHtml +=
            `<img src="${img.url}" alt="" class="gallery-img" onclick="onImgSelect(${img.id})">`
    });

    elGallery.innerHTML = strHtml
}

function onImgSelect(id) {

    
    setImg(id)
    var elGallery = document.querySelector('.gallary-conatiner')
    var elEditor = document.querySelector('.editor-section')

    elGallery.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
    resizeCanvas()
    renderMeme()

}

