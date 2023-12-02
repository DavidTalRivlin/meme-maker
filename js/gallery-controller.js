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

    document.querySelectorAll('.header-btn').forEach((currEl)=> {
        currEl.classList.remove('active')
      
      
        let currSpan = currEl.querySelector('span')
        currSpan.classList.remove('menu-gr-txt')
    })

    resizeCanvas()
    renderMeme()

}


function toggleMenu() {
    document.body.classList.toggle('menu-open')

    let elbtn = document.querySelector('.menu-btn')
    elbtn.classList.toggle('rotated')
}


function onNavClicked(el){
    
    document.querySelectorAll('.header-btn').forEach((currEl)=> {
        currEl.classList.remove('active')
      
        

        let currSpan = currEl.querySelector('span')
        currSpan.classList.remove ('.menu-gr-txt')

    })

    el.classList.add ('active')
    el.querySelector('span').classList.add('menu-gr-txt')
}
    