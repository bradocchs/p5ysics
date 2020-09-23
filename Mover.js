class Mover {
  constructor() {
    this.acceleration = createVector()
    this.position = createVector()
    this.size = 10
    this.velocity = createVector()
  }

  draw() {
    fill(255)
    noStroke()
    circle(this.position.x, this.position.y, this.size)
  }

  update() {

  }
}