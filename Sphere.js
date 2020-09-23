class Sphere {
  constructor() {
    this.acceleration = createVector()
    this.position = createVector()
    this.diameter = 0.5
    this.velocity = createVector()
  }

  draw(scale) {
    fill(255)
    noStroke()
    circle(
      this.position.x + this.diameter * scale,
      this.position.y + this.diameter * scale,
      this.diameter * scale
    )
  }

  update() {}
}
