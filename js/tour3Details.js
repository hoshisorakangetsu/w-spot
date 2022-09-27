// this file exists solely to bind the image map to the resizable map
const tour3ImgMap = document.getElementById('tour-3-img-map')
const tour3Img = document.getElementById('tour-3-img')
new ResizableMap(tour3ImgMap, tour3Img, 600, 450)
