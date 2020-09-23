class Sphere {
  constructor() {
    this.acceleration = createVector() // apply all forces from without?
    this.position = createVector(5, 10) // actual distance and height in simulation
    this.diameter = 0.5 // actual size in meters
    this.mass = 1 // actual weight in kg
    this.velocity = createVector() // actual speed in m/s
  }

  addForce(force) {
    this.velocity.add(force)
  }

  draw(height, scale) {
    fill(255)
    noStroke()
    circle(
      this.position.x * scale,
      height - this.position.y * scale,
      this.diameter * scale
    )
  }

  update(tick) {
    this.position.add(this.velocity.mult(tick))
  }
}
