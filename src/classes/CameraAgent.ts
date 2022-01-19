import Border from "./Border";
import Particle from "./Particle";
import Ray from "./Ray";
import Vector from "./Vector";
import Game from "./Game";
export default class CameraAgent {
  public ctx: CanvasRenderingContext2D;

  public static readonly HACK_RANGE_E = 100;
  public static readonly HACK_RANGE_M = 80;
  public static readonly HACK_RANGE_H = 60;

  public pos: Vector;

  public rays: Array<any> = [];

  public radius: number;

 

  public angleView: number;

  
  public widthHall: number;

  public target: Vector;

 private dir:Vector

  public viewRays: Array<Ray>;
  public sight: number;


  public checkAngle: number;

  public checkRays: Array<Ray> = [];

  private goldkeyImg: HTMLImageElement;

 

  public raysEnd: any[];

  

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    widthHall: number,
    sight: number,
    targetx:number,
    targety:number
  ) {
    this.ctx = ctx;
    this.raysEnd = [];
    
    this.pos = new Vector(x, y);
    this.goldkeyImg = Game.loadNewImage("./img/objects/gold_trophytest.png");
    this.rays = [];
    this.radius = 10;
   
    this.angleView = 25;
    this.dir=new Vector(0,0)
    this.widthHall = widthHall;
   
   
    for (let i = 0; i < 360; i += 90) {
      this.rays.push(new Ray(this.pos, i, this.ctx));
    }
    this.target = new Vector(targetx, targety);
   
    this.viewRays = [];
    this.sight = 80;
    this.checkAngle = 9;
   this.sight=sight
  }

  

 
  

  update() {
    this.dir.x = this.target.x - this.pos.x;
    this.dir.y = this.target.y - this.pos.y;

    const a = this.pos.x - this.pos.x + this.dir.x;
    const b = this.pos.y - this.pos.y + this.dir.y;
    const d = Math.sqrt(a * a + b * b);

    const radians = Math.atan2(a, b);
    let degrees = (radians * 180) / Math.PI - 90; // rotate

    while (degrees >= 360) degrees -= 360;
    while (degrees < 0) degrees += 360;

   

   
    this.viewRays = [];

    for (let i = degrees - this.angleView; i < degrees; i += 1) {
      this.viewRays.push(new Ray(this.pos, i, this.ctx));
    }
    for (let i = degrees; i < degrees + this.angleView; i += 1) {
      this.viewRays.push(new Ray(this.pos, i, this.ctx));
    }

   
  }

  

 
  public show(ctx: CanvasRenderingContext2D) {
   
    //this.writeTextToCanvas(`${this.keyNum}`,20,this.pos.x+15,this.pos.y-10)
    let color = "yellow";
   
    
      ctx.lineWidth = 1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    

    for (let i = 0; i < this.raysEnd.length; i++) {
        ctx.strokeStyle="green"
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(
        this.pos.x + this.raysEnd[i].x,
        this.pos.y + this.raysEnd[i].y
      );
      
      ctx.closePath();
      ctx.stroke();
     
    }
  }
  public look(borders: Array<Border>, ctx: CanvasRenderingContext2D) {
    this.raysEnd = [];
    for (let ray of this.viewRays) {
      let closest = { x: -1, y: -1 };
      let record = Infinity;

      for (let border of borders) {
        const p = ray.cast(border);

        if (p) {
          //reken distance tussen particle en point op border

          const a = p.x - this.pos.x;
          const b = p.y - this.pos.y;
          const d = Math.sqrt(a * a + b * b);

          if (d <= record) {
            //this.writeTextToCanvas(Math.round(d),p.x,p.y+30)

            //console.log("record: "+ record, "newD: " + Math.round(d))
            record = d;
            closest.x = p.x;
            closest.y = p.y;
          }
        }
      }
      if (closest.x != -1) {
        
          ctx.strokeStyle = "rgb(0,0,255)";
          // this.ctx.fillRect(closest.x, closest.y, 10, 10);

          let rv = new Vector(closest.x, closest.y);
          rv.sub(this.pos);

          rv.limit(this.sight);
          this.raysEnd.push({ x: rv.x, y: rv.y });
        
      }
    }
  }

  public inSight(
    particle: Particle,
    ctx: CanvasRenderingContext2D,
    borders2: Array<Border>
  ) {
    let borders = [...borders2];
    borders.push(
      new Border(
        particle.pos.x,
        particle.pos.y - particle.radius,
        particle.pos.x,
        particle.pos.y + particle.radius,
        ctx,
        "particle"
      )
    );
    borders.push(
      new Border(
        particle.pos.x - particle.radius,
        particle.pos.y,
        particle.pos.x + particle.radius,
        particle.pos.y,
        ctx,
        "particle"
      )
    );

    let gotya = false;

    for (let ray of this.viewRays) {
      let closest = { x: -1, y: -1 };
      let record = this.sight;
      let type = "";

      for (let border of borders) {
        const p = ray.cast(border);

        if (p) {
          //reken distance tussen particle en point op border

          const a = p.x - this.pos.x;
          const b = p.y - this.pos.y;
          const d = Math.sqrt(a * a + b * b);

          if (d <= record) {
            //this.writeTextToCanvas(Math.round(d),p.x,p.y+30)

            //console.log("record: "+ record, "newD: " + Math.round(d))
            record = d;
            closest.x = p.x;
            closest.y = p.y;
            type = border.type;
          }
        }
      }
      if (closest.x != -1 && type === "particle") {
        gotya = true;
      }
    }
    if (gotya) {
      let rv = new Vector(this.target.x, this.target.y);
      rv.sub(this.pos);

      rv.setMag(this.sight + 20);
     
      console.log("gotya");
      return true;
    }
    return false;
  }

  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "white"
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
