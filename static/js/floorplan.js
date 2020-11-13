
const ofSet = 10;
var shapes = ['rect', 'polygon']
var rects = document.querySelectorAll('rect');
var polys = document.querySelectorAll('polygon');
var paths = document.querySelectorAll('path');
var mapLevel1 = document.getElementById('Level1');
var vBox = mapLevel1.getAttribute('viewBox');

console.log(vBox)
zoomed = false;

for( var rect of rects ) {
  rect.addEventListener( 'mouseover', cb );
  rect.addEventListener('click', cked)
}
for( var path of paths ) {
  path.addEventListener( 'mouseover', cb );
  path.addEventListener('click', cked)
}

for (var poly of polys) {
  poly.addEventListener( 'mouseover', cb );
  poly.addEventListener('click', cked)
  poly.addEventListener('wheel', we)
}
function we() {
  console.log("Inside wheel event function");
}
function cb() {
  console.log("Inside mouseover function");
}

function cked() {
  console.log("Inside clicked function");
  console.log(this.getAttribute('id'))
  console.log(this.getAttribute('class'))
  eleid = document.getElementById(this.getAttribute('id'))
  eleid.setAttribute('stroke-width', 1)
  console.log(eleid)
  coord_array = getViewBoxCoordinates(eleid, shapes);
  zoomed_coord = getZoomedCoordinates(coord_array, ofSet);
  if (zoomed) {
    mapLevel1.setAttribute("viewBox",vBox );
    zoomed = false
  }
  else{
    mapLevel1.setAttribute("viewBox",zoomed_coord );
    zoomed = true
  }
}

function getZoomedCoordinates(inArr, mPlier){
  xywh = inArr.split(" "), x = parseInt(xywh[0]), y = parseInt(xywh[1]), w = parseInt(xywh[2]), h = parseInt(xywh[3]);
  x = x - (1*mPlier);
  y = y - (1*mPlier);
  nw = w + (2 * mPlier);
  nh = h + (2 * mPlier);
  // console.log(inArr)
  // console.log (x.toString() + " " + y.toString() + " " + nw.toString() + " " + nh.toString())
  return (x.toString() + " " + y.toString() + " " + nw.toString() + " " + nh.toString())
}
function getViewBoxCoordinates(element, mapShapes){
  if (eleid.getAttribute('x') == null){
    return getPointVbCoordinate(eleid.getAttribute('points'))
  }
  else{
    return eleid.getAttribute('x') + " " + eleid.getAttribute('y') + " " + eleid.getAttribute('width') + " " + eleid.getAttribute('height')
  }
}

function getPointVbCoordinate(shapePoints) {
  var coords = [];
  coords = shapePoints.split(" ")
  vbX = [];
  vbY = [];
  for (const property in coords) {

    var array = coords[property].split(","), a = array[0], b = array[1];
      if (parseInt(a) != NaN) {
        vbX.push(parseInt(a));
        vbY.push(parseInt(b));
      }      
  }
  xMin = Math.min(...vbX);
  xMax = Math.max(...vbX);
  yMax = Math.max(...vbY);
  yMin = Math.min(...vbY);
  w = xMax - xMin;
  h = yMax - yMin;
  return (xMin.toString() + " " + yMin.toString() + " " + w.toString() + " " + h.toString())
}

