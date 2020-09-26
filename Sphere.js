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
    ch.innerHTML = this.position.y.toFixed(2)
    cd.innerHTML = this.position.x.toFixed(2)
    cv.innerHTML = (this.velocity.mag() * 30).toFixed(2)
  }

  update() {
    if (this.position.y > this.diameter / 2) {
      this.velocity.add(Fg)
    }
    if (this.velocity.mag() > cf) {
      const f = this.velocity.copy().mult(-1).setMag(cf)
      this.velocity.add(f)
      this.position.add(this.velocity)
      if (this.position.y < this.diameter / 2) {
        this.velocity.mult(-1).sub(Fg)
        // if (this.velocity.mag() < 0.05) noLoop()
      }
    } else {
      this.velocity.mult(0)
    }
  }
}
