//global var
  var oddOrEven;

  //input = createInput();
  //input.position(width/2, height/4);
 // input.size (300, [100]);
// P_3_2_4_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Drawing tool for creating moire effect compositions using
 * smooth path of any length, width, smoothness and colour.
 *
 * MOUSE
 * position x          : path simplification
 * position y          : ribbon width
 *
 * KEYS
 * arrow right         : increase path density
 * arrow left          : decrease path density
 * arrow up            : increase font size
 * arrow down          : decrease font size
 * control             : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';
var letters = [];
var density = 2;
var ribbonWidth = 200;
var fontSize;
var pathSimplification = 0;
var pathSampleFactor = 0.5;
var textTyped = 'a';
var font;
function preload() {
  font = loadFont('data/NotoSans-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);



  fontSize = random(10,200);
  createLetters();
}
function draw() {
  background(255);
 lineshape();

//Added push and pop.
 var shapeColor = color(0,128,128,random(0,150));
 push();
let stroke1 = color(shapeColor);
  stroke(stroke1);
  translate(100, height * 0.75);
  pathSampleFactor = 0.1 * pow(0.05, mouseX / width);
  ribbonWidth = map(mouseY, 0, height, 1, 200);
  for (var i = 0; i < letters.length; i++) {
    letters[i].draw();
  }
  pop();
}
function createLetters() {
  letters = [];
  var chars = textTyped.split('');
  var x = 0;
  for (var i = 0; i < chars.length; i++) {
    if (i > 0) {
      var charsBefore = textTyped.substring(0, i);
      x = font.textBounds(charsBefore, 0, 0, fontSize).w;
    }
    var newLetter = new Letter(chars[i], x, 0);
    letters.push(newLetter);
  }
}
function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;
  Letter.prototype.draw = function() {
    var path = font.textToPoints(this.char, this.x, this.y, fontSize, {sampleFactor: pathSampleFactor});
    //var stroke1 = stroke(shapeColor);
    for (var d = 0; d < ribbonWidth; d += density) {
      beginShape();
      for (var i = 0; i < path.length; i++) {
        var pos = path[i];
        var nextPos = path[i + 1];
        if (nextPos) {
          var p0 = createVector(pos.x, pos.y);
          var p1 = createVector(nextPos.x, nextPos.y);
          var v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(random(PI,PI+HALF_PI));
          v.mult(d);
          var pneu = p5.Vector.add(p0, v);
          curveVertex(pneu.x, pneu.y);
        }
      }
      endShape(CLOSE);
    }
  };
}
function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == LEFT_ARROW) density *= 1.25;
  if (keyCode == RIGHT_ARROW) density /= 1.25;
  if (keyCode == UP_ARROW) {
    fontSize *= 1.1;
    createLetters();
  }
  if (keyCode == DOWN_ARROW) {
    fontSize /= 1.1;
    createLetters();
  }
  if (keyCode == ENTER) createLetters();
}
function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      createLetters();
    }
  }
}
function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    createLetters();
  }
}
//added push and pop and called the strokes within the function
function lineshape() {
  let stroke2 = color(0,0,0);
  let stroke3 = color(255,255,255);
oddOrEven = (frameCount % 2);
    line((width/2)-10, height/2, (width/2)-10, 90);
  if (oddOrEven == 1){
    push();
   stroke(stroke2);
pop();
  }
  else {
      push();
   stroke (stroke3);
   pop();
  }
}
