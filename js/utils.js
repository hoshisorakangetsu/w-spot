// this file contains utility functions

function addMultipleEventListeners(el, fn, ...listeners) {
  listeners.forEach(l => el.addEventListener(l, fn))
}