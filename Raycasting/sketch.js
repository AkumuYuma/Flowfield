let walls = [];
let ray;
let wall;

function setup() {
    createCanvas(800, 800);
    ray = new Ray(width / 2, height / 2);
    wall = new Wall();

    // for (let i = 0; i < 5; i++) {
    //     walls[i] = new Wall();
    // }
}

function draw() {
    background(0);
    ray.show();
    wall.show();

    ray.calculateDirection();
    let intersection = ray.intersection(wall);
    if (intersection) {
        ellipse(intersection.x, intersection.y, 5, 5);
    }

    //for (wall of walls) {
    //    wall.show();
    //}
}
