// this file exists solely to bind the image map to the resizable map
const tour1ImgMap = document.getElementById('tour-1-img-map')
const tour1Img = document.getElementById('tour-1-img')
new ResizableMap(tour1ImgMap, tour1Img, 1920, 1080)
