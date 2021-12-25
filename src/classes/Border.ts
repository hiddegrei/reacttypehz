import Vector from "./Vector";

export default class Border {

  public a:Vector;
  public b :Vector;
  public ctx: CanvasRenderingContext2D;
  public type:string


  constructor(x1: number, y1: number, x2: number, y2: number, ctx: CanvasRenderingContext2D,type:string) {
    this.a = new Vector(x1,y1)
    this.b = new Vector(x2,y2)
    this.type=type

    this.ctx = ctx;
    this.type=type

  }

  show() {
    if(this.type==="normal"){
    this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()
    }else{
      this.ctx.strokeStyle = "rgb(0,0,255)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()

    }
  }
}