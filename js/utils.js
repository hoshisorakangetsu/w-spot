// this file contains utility functions
/**
 * Adds multiple event listeners to an object
 * @param {HTMLElement | Window} el Element to apply the listener
 * @param {(el: HTMLElement, ev: Event) => void} fn function to run when listener triggered
 * @param  {...(WindowEventMap | HTMLElementEventMap)} listeners Listeners to be added
 */
function addMultipleEventListeners(el, fn, ...listeners) {
  listeners.forEach(l => el.addEventListener(l, fn))
}