class Raysystem {
    constructor(x, y) {
        this.rays = [];
        this.pos = createVector(x, y);
        for (let i = 0; i < 360; i += 1) {
            this.rays.push(new Ray(this.pos.x, this.pos.y, i));
        }
    }


    update() {
        this.pos.x = mouseX;
        this.pos.y = mouseY;

        for (let ray of this.rays) {
            ray.pos = this.pos;
        }

    }

    checkWalls(walls) {
        stroke(255);
        for (let ray of this.rays) {
            let minDistance = Infinity;
            let closer;
            for (let wall of walls) {
                let intersection = ray.intersection(wall);
                if (intersection) {
                    let distance = dist(this.pos.x, this.pos.y, intersection.x, intersection.y);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closer = intersection;
                    }
                }
            }

            if (closer) {
                line(ray.pos.x, ray.pos.y, closer.x, closer.y);
            } else {
                line(ray.pos.x, ray.pos.y, ray.pos.x + ray.direction.x * 1000, ray.pos.y + ray.direction.y * 1000);
            }
        }
    }
}
