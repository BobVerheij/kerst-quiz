import React from "react";
import Sketch from "react-p5";

let pieces = [];
let front = [];

const getSize = (p5) => {
  const randVal = p5.random(0, 5);

  if (randVal < 1) {
    return 32;
  }
  return 16;
};

const getColor = (p5) => {
  const randValue = p5.random(0, 5);

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

export default (props) => {
  class Ash {
    constructor(p5) {
      this.color = this.getColor(p5);
      this.disp = p5.floor(p5.random(1, 3)) * 4;
    }
    getColor(p5) {
      const randVal = p5.random(0, 4);
      if (randVal < 1) return "grey";
      if (randVal < 2) return "lightgrey";
      if (randVal < 3) return "#303030";
      if (randVal < 4) return "dimgray";
    }
  }

  class FirePiece {
    constructor(base, p5) {
      this.iteration = p5.floor(p5.random(0, 40));
      this.dir = p5.random() < 0.5 ? 1 : -1;
      this.id =
        pieces.reduce((acc, piece) => (piece.id > acc ? piece.id : acc), 0) + 1;

      this.size = getSize(p5);
      this.displace =
        p5.floor(p5.random(-p5.width / 8 / 16, p5.width / 8 / 16)) * 16;
      this.color = getColor(p5);

      this.position = p5.createVector(
        p5.width / 2 + this.displace,
        p5.height -
          this.size -
          (this.size < 32
            ? base
              ? p5.floor(p5.random(0, p5.height / 8) * 8)
              : p5.floor(p5.random(0, this.size) * 4)
            : 0)
      );

      this.checkSize(p5);
    }

    update(p5) {
      this.speed = this.getSpeed();
      this.checkSize(p5);
      this.position.y -= this.speed;
      this.position.x = p5.constrain(
        this.position.x + (p5.random(0, 5) < 1 ? this.dir * 8 : 0),
        p5.width / 3,
        p5.width - p5.width / 3
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

    checkSize(p5) {
      if (this.position.y < p5.height - p5.height / 4) {
        this.size = 16;
      }
      if (this.position.y < p5.height / 2) {
        this.size = 8;
      }

      if (this.position.y < p5.height / 3) {
        this.size = 4;
      }

      if (this.position.y < p5.height / 4) {
        this.size = 2;
        this.color = "#b2beb5";
      }
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(props?.w || 600, 400).parent(canvasParentRef);
    p5.rectMode(p5.CENTER);

    p5.frameRate(6);

    for (let i = 0; i < 50; i++) {
      pieces.push(new FirePiece(true, p5));
    }

    for (let i = 0; i < p5.width / 2 + 32; i += 16) {
      front.push(new Ash(p5));
    }
  };

  const draw = (p5) => {
    p5.clear();
    p5.fill("#602812");
    p5.rect(p5.width / 2, p5.height - (16 * 4) / 2, p5.width / 1.5, 16 * 4);

    p5.noStroke();
    pieces = pieces.sort((a, b) => b.size - a.size);

    for (let i in pieces) {
      p5.fill(pieces[i].color);
      p5.square(pieces[i].position.x, pieces[i].position.y, pieces[i].size * 4);
      pieces[i].update(p5);
    }

    pieces = pieces.filter(
      (piece) => piece.position.y > piece.size && piece.iteration < 50
    );

    if (pieces.length < 20) {
      pieces.push(new FirePiece(false, p5));
    }

    p5.fill("#602812");
    p5.rect(p5.width / 2, p5.height, p5.width / 1.5 - 4, 16 * 4);
    for (let i in front) {
      p5.fill(front[i].color);
      p5.rect(
        p5.width / 2 - p5.width / 4 - 16 + 16 * i,
        p5.height - 32 + front[i].disp,
        16,
        16
      );
    }
  };

  return <Sketch style={props.style} setup={setup} draw={draw} />;
};
