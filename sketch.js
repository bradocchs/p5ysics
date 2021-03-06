let playpause,
  reset,
  preview,
  scale,
  scaleValue,
  objSize,
  objH,
  objD,
  objV,
  objVdeg,
  objA,
  objAdeg,
  ch,
  cd,
  cv,
  Fg,
  cf,
  t = 0,
  tick = 1 / 30,
  time,
  sphere

function setup() {
  sphere = new Sphere()
  Fg = createVector(0, -(9.81 * (tick * tick)))
  cf = 0.47 * tick
  playpause = document.getElementById('playpause')
  reset = document.getElementById('reset')
  time = document.getElementById('time')
  playpause.addEventListener('click', () => {
    if (isLooping()) {
      noLoop()
    } else {
      loop()
    }
  })
  reset.addEventListener('click', () => {
    h = parseFloat(objH.value)
    d = parseFloat(objD.value)
    v = p5.Vector.fromAngle(radians(objVdeg.value), objV.value * tick)
    t = 0
  })
  preview = createCanvas(600, 600)
  preview.parent('preview')
  scaleValue = document.getElementById('scale-value')
  scale = document.getElementById('scale')
  scale.addEventListener('input', () => {
    scaleValue.innerHTML = scale.value
    redraw()
  })
  objSize = document.getElementById('object-size')
  objH = document.getElementById('object-h')
  objH.addEventListener('input', () => {
    h = parseFloat(objH.value)
    redraw()
  })
  objD = document.getElementById('object-d')
  objD.addEventListener('input', () => {
    d = parseFloat(objD.value)
    redraw()
  })
  objV = document.getElementById('object-v')
  objVdeg = document.getElementById('object-v-deg')
  objV.addEventListener('input', () => {
    v = p5.Vector.fromAngle(radians(objVdeg.value), objV.value * tick)
  })
  objVdeg.addEventListener('input', () => {
    v = p5.Vector.fromAngle(radians(objVdeg.value), objV.value * tick)
  })
  objA = document.getElementById('object-a')
  objAdeg = document.getElementById('object-a-deg')
  objA.addEventListener('input', () => {
    let neg = false
    if (objA.value < 0) neg = true
    let acc = sqrt(abs(objA.value))
    if (neg) acc = -acc
    a = p5.Vector.fromAngle(radians(objAdeg.value), acc * tick)
  })
  objAdeg.addEventListener('input', () => {
    let neg = false
    if (objA.value < 0) neg = true
    let acc = sqrt(abs(objA.value))
    if (neg) acc = -acc
    a = p5.Vector.fromAngle(radians(objAdeg.value), acc * tick)
  })
  h = parseFloat(objH.value)
  d = parseFloat(objD.value)
  v = p5.Vector.fromAngle(radians(objVdeg.value), objV.value * tick)
  let neg = false
  if (objA.value < 0) neg = true
  let acc = sqrt(abs(objA.value))
  if (neg) acc = -acc
  a = p5.Vector.fromAngle(radians(objAdeg.value), acc * tick)
  ch = document.getElementById('current-height')
  cd = document.getElementById('current-distance')
  cv = document.getElementById('current-velocity')
  frameRate(30)
  noLoop()
}

function draw() {
  background(0)
  noFill()
  stroke(30)
  strokeWeight(1)
  const step = preview.width / scale.value
  for (let x = 0; x <= preview.width; x += step) {
    line(x, 0, x, preview.height)
  }
  for (let y = 0; y <= preview.height; y += step) {
    line(0, y, preview.width, y)
  }
  noStroke()
  fill(150)
  textSize(24)
  text('h', 10, preview.height / 2 + 6)
  text('d', preview.width / 2 - 6, preview.height - 10)
  fill(255)
  if (isLooping()) {
    t += tick
    // v.add(Fg)
    // if (v.mag() <= a.mag()) v.setMag(0)
    // if (v.x !== 0) d += v.x
    // if (v.y !== 0) h += v.y
    // if (h <= 0) noLoop()
    sphere.addForce(Fg, true)
    const fluid = sphere.velocity.copy()
    fluid.mult(-1).setMag(cf)
    sphere.addForce(fluid)
    sphere.update()
    sphere.checkEdges()
  }
  sphere.draw(preview.height, step)
  const diameter = (step / 1000) * objSize.value
  // circle(d * step, preview.height - h * step, diameter)
  // ch.innerHTML = h.toFixed(2)
  // cd.innerHTML = d.toFixed(2)
  // cv.innerHTML = (v.mag() * 30).toFixed(2)
  time.innerHTML = t.toFixed(2)
}
