'use strict'

function saveToStorage(key, value) {
      const strVal = JSON.stringify(value)
      localStorage.setItem(key, strVal)
}

function removeFromStorage(key) {
      localStorage.removeItem(key)
}

function loadFromStorage(key) {
      var strVal = localStorage.getItem(key)
      return JSON.parse(strVal)
}
