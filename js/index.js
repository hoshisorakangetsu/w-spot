// select all the divs that want to be 3d transformed
const hero1 = document.querySelector('#hero-1 > .hero-wrapper')
const hero2 = document.querySelector('#hero-2 > .hero-wrapper')

class Card3D {
  /**
   * Gives an element the ability to transform in 3D based on mouse move
   * @param {HTMLElement} el The element that will transform 3D
   * @param {number} maxDeg The maximum degree / 2 for the element to rotate in 3d
   */
  constructor(el, maxDeg) {
    this.el = el
    this.maxDeg = maxDeg

    this.rotate3D = (ev) => {
      const mouseX = ev.offsetX
      const mouseY = ev.offsetY

      const elWidth = this.el.clientWidth
      const elHeight = this.el.clientHeight

      // maximum rotate degrees / 2
      const MAX_DEGREES = this.maxDeg
      // rotation by x-axis depends on the vertical position of the mouse
      const rotateX = (MAX_DEGREES / 2 - (mouseY / elHeight) * MAX_DEGREES).toFixed(2)
      // rotation by y-axis depends on the horizontal position of the mouse
      const rotateY = ((mouseX / elWidth) * MAX_DEGREES - MAX_DEGREES / 2).toFixed(2)

      this.el.style.transform = `translateY(-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    this.el.addEventListener("mouseenter", () => {
      console.log(this)
      this.el.addEventListener("mousemove", this.rotate3D)
    })

    this.el.addEventListener("mouseleave", () => {
      // reset the transform first
      this.el.style.transform = `translateY(-50%)`
      this.el.removeEventListener("mousemove", this.rotate3D)
    })
  }
}

new Card3D(hero1, 6)
new Card3D(hero2, 6)
