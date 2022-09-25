// functions for all those tour details
class ResizableMap {
  /**
   * Creates a resizable map that resizes the image map based on window size
   * @param {HTMLMapElement} map The map element which needs to be resized
   * @param {number} originalWidth Original width of the image bound to
   * @param {number} originalHeight Original height of the image bound to
   */
  constructor(map, originalWidth, originalHeight) {
    console.log(this)
    // set this and trigger resize once (which will calculate and remap the coords
    this.previousWidth = originalWidth
    this.previousHeight = originalHeight
  
    this.resize = () => {
      console.log('resize triggered')
      console.log('previous width:', this.previousWidth)
      console.log('previous height:', this.previousHeight)
      console.log('map:', map)
    }
  
    // trigger resize once to adjust the coords
    this.resize()
  
    // trigger resize whenever window changes size
    window.addEventListener("resize", this.resize)
  }
}
