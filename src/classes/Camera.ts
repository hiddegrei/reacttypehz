import Particle from "./Particle";

export default class Camera{

    private matrix: Array<number> = [];

  private invMatrix: Array<number> = [];

    constructor(){
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.invMatrix = [1, 0, 0, 1];

    }

    
    public checkScaling(canvas:HTMLCanvasElement,particle:Particle) {
        let ret = { x: 0, y: 0 }
        if (window.innerWidth >= canvas.width && window.innerHeight >= canvas.height) {
          return { x: 0, y: 0 }
        } else {
    
    
          let offsetX = canvas.width - window.innerWidth;
          let offsetY = canvas.height - window.innerHeight;
          if (particle.pos.x > window.innerWidth / 2 && particle.pos.x < window.innerWidth / 2 + offsetX) {
            ret.x = -(offsetX - (window.innerWidth / 2 + offsetX - particle.pos.x))
          }
          if (particle.pos.x > window.innerWidth / 2 + offsetX) {
            ret.x = -(offsetX)
          }
          if (particle.pos.y > window.innerHeight / 2 && particle.pos.y < window.innerHeight / 2 + offsetY) {
            ret.y = -(offsetY - (window.innerHeight / 2 + offsetY - particle.pos.y))
          }
          if (particle.pos.y > window.innerHeight / 2 + offsetY) {
            ret.y = -(offsetY)
          }
          return ret
        }
    
      }

      createMatrix(x: number, y: number, scale: number, rotate: number) {
        // var m = this.matrix; // just to make it easier to type and read
        // var im = this.invMatrix; // just to make it easier to type and read
    
        // create the rotation and scale parts of the matrix
        this.matrix[3] = this.matrix[0] = Math.cos(rotate) * scale;
        this.matrix[2] = -(this.matrix[1] = Math.sin(rotate) * scale);
    
        // add the translation
        this.matrix[4] = x;
        this.matrix[5] = y;
    
    
        // calculate the inverse transformation
    
        // first get the cross product of x axis and y axis
        let cross = this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2];
    
        // now get the inverted axis
        if (cross != 0) {
          this.invMatrix[0] = this.matrix[3] / cross;
          this.invMatrix[1] = -this.matrix[1] / cross;
          this.invMatrix[2] = -this.matrix[2] / cross;
          this.invMatrix[3] = this.matrix[0] / cross;
        } else {
          this.invMatrix = [1, 0, 0, 1]
        }
      }
    
      toWorld(x: number, y: number) {
    
        var xx, yy, m, result;
        m = this.invMatrix;
        xx = x - this.matrix[4];     // remove the translation 
        yy = y - this.matrix[5];     // by subtracting the origin
        // return the point {x:?,y:?} by multiplying xx,yy by the inverse matrix
        return {
          x: xx * this.invMatrix[0] + yy * this.invMatrix[2],
          y: xx * this.invMatrix[1] + yy * this.invMatrix[3]
        }
      }
}