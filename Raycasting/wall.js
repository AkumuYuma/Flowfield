class Wall {
    constructor() {
        this.start = createVector(random(width), random(height));
        this.end = createVector(random(width), random(height));
        //this.start = createVector(600, 0);
        //this.end = createVector(600, height);
    }

    show() {
        stroke(255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}
