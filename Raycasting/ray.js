class Ray {
    constructor(x, y) {
        // Posizione e direzione
        this.pos = createVector(x, y);
        this.direction = createVector(1, 0);
        this.direction.normalize();
    }

    calculateDirection() {
        // Calcolo la direzione in base alla posizione del mouse
        this.direction = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
        this.direction.normalize();
    }

    intersection(wall) {
        // Calcolo il punto di insersezione con il muro. Se non esiste, ritorno undefined
        let x1 = this.pos.x;
        let y1 = this.pos.y;
        let x2 = this.pos.x + this.direction.x;
        let y2 = this.pos.y + this.direction.y;
        let x3 = wall.start.x;
        let y3 = wall.start.y;
        let x4 = wall.end.x;
        let y4 = wall.end.y

        let den = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        let u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den;
        if (t >= 0 && u >= 0 && u <= 1) {
            return createVector((x3 + u * (x4 - x3)), (y3 + u * (y4 - y3)));
        } else {
            return undefined;
        }
    }

    show() {
        // Disegno il raggio
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.direction.x * 10, this.direction.y * 10);
        pop();
    }
}
