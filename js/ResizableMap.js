// to make the image maps responsive
// hahah this might be the first and last time i document the functions properly due to time
class ResizableMap {
  /**
   * Creates a resizable map that resizes the image map based on window size
   * @param {HTMLMapElement} map The map element which needs to be resized
   * @param {HTMLImageElement} img The image that has been resized
   * @param {number} originalWidth Original width of the image bound to
   * @param {number} originalHeight Original height of the image bound to
   */
  constructor(map, img, originalWidth, originalHeight) {
    // set this and trigger resize once (which will calculate and remap the coords
    this.previousWidth = originalWidth
    this.previousHeight = originalHeight
    this.map = map
    this.img = img

    this.resize = () => {
      // all the area tags of the map elements, converting it into array first
      let areas = Array.from(this.map.areas)
      areas.forEach(area => {
        // we only support rectangle shapes rn
        if (area.shape === 'rect') {
          // get the coordinates and parse them
          const coords = area.coords.split(',').map(coord => parseFloat(coord))

          const newWidth = this.img.clientWidth
          const newHeight = this.img.clientHeight
          const widthChngeRatio = newWidth / this.previousWidth
          const heightChngeRatio = newHeight / this.previousHeight

          const newCoords = coords.map((coord, idx) => {
            // x coordinates (index 0 and 2)
            if (idx % 2 === 0) {
              return coord * widthChngeRatio
            } else {
              // y coordinates (index 1 and 3)
              return coord * heightChngeRatio
            }
          })

          // set the coordinates to the new coordinates calculated
          area.coords = newCoords.join(',')
          // reset the value of previous height and width so next time resize will resize relative to this size
          this.previousWidth = newWidth
          this.previousHeight = newHeight
        }
      })
    }

    // trigger resize once to adjust the coords
    this.resize()

    // trigger resize whenever window changes size
    window.addEventListener("resize", this.resize)
  }
}
