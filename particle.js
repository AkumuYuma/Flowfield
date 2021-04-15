class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevpos = this.pos.copy();
    this.vel = createVector();
    this.velimit = 2; 
    this.acc = createVector(); 
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  updatepos() {
    this.prevpos = this.pos.copy();
  }
  
  update() {
    this.updatepos();
    this.vel.add(this.acc);
    this.vel.limit(this.velimit);
    this.pos.add(this.vel);
    this.edges();
    
    this.acc.set(0, 0);
  }
  
  show() {
    push();
    strokeWeight(1); 
    // stroke(0);
    stroke(this.pos.x, this.pos.y, zoff * 255, 20); 
    
    line(this.prevpos.x, this.prevpos.y, this.pos.x, this.pos.y); 
    pop();
  }
  
  edges() {
    // Gestisco gli angoli con l'effetto pacman per semplicità
    if (this.pos.x >= width) {
      this.pos.x = 0;
      this.updatepos();
    } else if (this.pos.y >= height) {
      this.pos.y = 0;
      this.updatepos();
    } else if (this.pos.x <= 0) {
      this.pos.x = width;
      this.updatepos();
    } else if (this.pos.y <= 0) {
      this.pos.y = height;
      this.updatepos();
    }
  }
  
  followfield(flowfield) {
    let x = floor(this.pos.x / scl); 
    let y = floor(this.pos.y / scl);
    let index = x + y * cols; 
    let force = flowfield[index];
    this.applyForce(force);
  }
  
}