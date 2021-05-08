let walls = [];
let system;

function setup() {
    createCanvas(800, 800);

    system = new Raysystem(10, 10);
    for (let i = 0; i < 5; i++) {
        walls[i] = new Wall();
    }
}

function draw() {
    background(0);

    system.update();
    system.checkWalls(walls);
    for (let wall of walls) {
        wall.show();
    }
}
