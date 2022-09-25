// functions for all those tour details
class ResizableMap {
  /**
   * Creates a resizable map that resizes the image map based on window size
   * @param {HTMLMapElement} map The map element which needs to be resized
   * @param {HTMLImageElement} img The image that has been resized
   * @param {number} originalWidth Original width of the image bound to
   * @param {number} originalHeight Original height of the image bound to
   */
  constructor(map, img, originalWidth, originalHeight) {
    console.log(this)
    // set this and trigger resize once (which will calculate and remap the coords
    this.previousWidth = originalWidth
    this.previousHeight = originalHeight
    this.map = map
    this.img = img
    
    this.resize = () => {
      console.log('resize triggered')
      console.log(this)
      console.log('previous width:', this.previousWidth)
      console.log('previous height:', this.previousHeight)
      console.log('map:', this.map)
      console.log('img:', this.img)
      // all the area tags of the map elements, converting it into array first
      let areas = Array.from(this.map.areas)
      areas.forEach(area => {
        // TODO: handle resize logic here
        console.log(area.coords)
      })
    }

    // trigger resize once to adjust the coords
    this.resize()

    // trigger resize whenever window changes size
    window.addEventListener("resize", this.resize)
  }
}
