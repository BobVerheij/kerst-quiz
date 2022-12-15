let pieces = [];
let front = [];

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);

  frameRate(4);
  for (let i = 0; i < 40; i++) {
    pieces.push(new FirePiece(true));
  }

  for (let i = 0; i < width / 2 + 32; i += 16) {
    front.push(new Ash());
  }
}

function draw() {
  clear();

  fill("#602812");
  stroke("black");
  strokeWeight(4);
  rect(width / 2, height - (16 * 4) / 2, width / 1.5, 16 * 4);

  noStroke();
  pieces = pieces.sort((a, b) => b.size - a.size);

  for (let i in pieces) {
    fill(pieces[i].color);
    square(pieces[i].position.x, pieces[i].position.y, pieces[i].size * 4);
    pieces[i].update();
  }

  pieces = pieces.filter(
    (piece) => piece.position.y > piece.size && piece.iteration < 50
  );

  if (pieces.length < 20) {
    pieces.push(new FirePiece(false));
  }

  fill("#602812");
  rect(width / 2, height, width / 1.5 - 4, 16 * 4);
  for (let i in front) {
    fill(front[i].color);
    rect(
      width / 2 - width / 4 - 16 + 16 * i,
      height - 32 + front[i].disp,
      16,
      16
    );
  }
}

class Ash {
  constructor() {
    this.color = this.getColor();
    this.disp = floor(random(1, 3)) * 4;
  }
  getColor() {
    const randVal = random(0, 4);
    if (randVal < 1) return "grey";
    if (randVal < 2) return "lightgrey";
    if (randVal < 3) return "#303030";
    if (randVal < 4) return "dimgray";
  }
}

class FirePiece {
  constructor(base) {
    this.iteration = floor(random(0, 40));
    this.dir = random() < 0.5 ? 1 : -1;
    this.id =
      pieces.reduce((acc, piece) => (piece.id > acc ? piece.id : acc), 0) + 1;

    this.size = getSize();
    this.displace = floor(random(-width / 8 / 16, width / 8 / 16)) * 16;
    this.color = getColor();

    this.position = createVector(
      width / 2 + this.displace,
      height -
        this.size -
        (this.size < 32
          ? base
            ? floor(random(0, height / 8) * 8)
            : floor(random(0, this.size) * 4)
          : 0)
    );

    this.checkSize();
  }

  update() {
    this.speed = this.getSpeed();
    this.checkSize();
    this.position.y -= this.speed;
    this.position.x = constrain(
      this.position.x + (random(0, 5) < 1 ? this.dir * 8 : 0),
      width / 3,
      width - width / 3
    );
    this.iteration++;
  }

  getSpeed() {
    if (this.size === 16) {
      return 8;
    }
    if (this.size === 8) {
      return 10;
    }
    if (this.size === 4) {
      return 12;
    }
    if (this.size === 2) {
      return 14;
    }
    return 0;
  }

  checkSize() {
    if (this.position.y < height - height / 4) {
      this.size = 16;
    }
    if (this.position.y < height / 2) {
      this.size = 8;
    }

    if (this.position.y < height / 3) {
      this.size = 4;
    }

    if (this.position.y < height / 4) {
      this.size = 2;
      this.color = "#b2beb5";
    }
  }
}

const getSize = () => {
  const randVal = random(0, 5);

  if (randVal < 1) {
    return 32;
  }
  return 16;
};

const getColor = () => {
  const randValue = random(0, 5);

  if (randValue < 1) {
    return "#B62203";
  }

  if (randValue < 2) {
    return "#D73502";
  }

  if (randValue < 3) {
    return "#FC6400";
  }

  if (randValue < 4) {
    return "#FF7500";
  }

  if (randValue < 5) {
    return "#FAC000";
  }
};
