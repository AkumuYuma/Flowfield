// Voglio disegnare un insieme di particelle che seguano il campo vettoriale

let cols, rows;
let scl = 20;

// Variabili per il perlin noise
let xoff, yoff, zoff;
let increment = 0.05; 

// Variabile per la scritta html 
let frames; 

// Array di particelle
let particles;

// Array del campo vettoriale
let flowfield; 

function setup() {
  
  createCanvas(500, 500);
  cols = floor(width/scl);
  rows = floor(height/scl); 
  zoff = 0;
  
  // Modo veloce di creare un oggetto p in html
  frames = createP();
  frames.style('color', 'white');
  
  // Inizializzo l'array di particelle in posizioni random 
  particles = new Array(4000);
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  
  // Inizializzo l'array del campo per salvare i valori 
  flowfield = new Array(rows * cols);
  console.log('Rows = ', rows); 
  console.log('Cols = ', cols);
  console.log('Number of particles = ', particles.length);
  background(0);

}


function draw() {
  

  frames.html(floor(frameRate()));

  xoff = 0;
  for (let x = 0; x < cols; x ++) {
    yoff = 0;
    for (let y = 0; y < rows; y ++) {

      angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      vec = p5.Vector.fromAngle(angle); 
      vec.setMag(3);
      
      // Questo è l'indice dell'array del campo 
      let index = x + y * cols; 
      // Salvo il valore del campo nel punto (x,y) nell'array 
      flowfield[index] = vec;
      
//       let arrow = vec.copy(); 
//       arrow.setMag(20);
//       drawArrow(x * scl, y * scl, arrow);
      
      
      yoff += increment;
    }
    xoff += increment;
  }
   zoff += 0.001;

  for (let particle of particles) {
    particle.update();
    particle.show();
    particle.followfield(flowfield);
  }
  
}


function drawArrow(x1, y1, vector) {
  // Disegna un vetore vector applicato al punto x1, y1
  stroke(0, 50); 
  strokeWeight(2);
  
  // Start è il pto di applicazione del vettore
  let start = createVector(x1, y1);
  
  push();
  translate(start.x, start.y)
  line(0, 0, vector.x, vector.y); 
  rotate(vector.heading());
  let arrowSize = 5;
  translate(vector.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
