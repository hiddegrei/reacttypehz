import Border from "./Border";
import Ray from "./Ray";
import Scene from "./Scene"
export default class Particle {
    public ctx: CanvasRenderingContext2D;

    public pos = <any>{};

    public rays: Array<any> = []

    public radius: number;

    public speed: number;

    public dir = <any>{};

    public mouse = <any>{};

    public angleView: number;

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.pos = { x: x, y: y };
        this.rays = []
        this.radius = 10
        this.speed = 2
        this.dir = { x: 0, y: 0 }
        this.mouse = { x: 0, y: 0 }
        this.angleView = 18

        //  for(let i=0;i<360;i+=1){
        //      this.rays.push( new Ray(this.pos,i,this.ctx))
        //  }


    }

    getAngleDeg(ax: number, ay: number, bx: number, by: number) {
        var angleRad = Math.atan((ay - by) / (ax - bx));
        var angleDeg = angleRad * 180 / Math.PI;

        return (angleDeg);
    }

    move(mx: number, my: number, borders: Array<Border>) {

        let walk = true

        if (this.rays.length > 0) {
            for (let j = 0; j < this.rays.length; j++) {
            for (let i = 0; i < borders.length; i++) {
                if(borders[i].type==="normal"){
                let pt = this.rays[j].cast(borders[i])
                if (pt) {
                    let a = pt.x - this.pos.x
                    let b = pt.y - this.pos.y
                    let d = Math.sqrt(a * a + b * b)
                    if (d < this.radius+5) {
                        walk = false

                    }
                }
            }
            }
        }
        }



        this.dir = { x: mx - this.pos.x, y: my - this.pos.y }

        const a = this.pos.x - this.pos.x + this.dir.x
        const b = this.pos.y - this.pos.y + this.dir.y
        const d = Math.sqrt((a * a) + (b * b))

        const radians = Math.atan2(a, b)
        let degrees = (radians * 180) / Math.PI - 90; // rotate


        while (degrees >= 360) degrees -= 360;
        while (degrees < 0) degrees += 360;

       // this.angleView = degrees



        this.rays = []

        for (let i = degrees - this.angleView; i < degrees; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx))

        }
        for (let i = degrees; i < degrees + this.angleView; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx))

        }



        this.dir.x = (this.dir.x / d) * this.speed
        this.dir.y = (this.dir.y / d) * this.speed

        if (d > 20 && walk) {


            this.pos.x += this.dir.x
            this.pos.y += this.dir.y
        }

















    }
    show() {
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath()
        this.ctx.fill()

        //this.writeTextToCanvas(`${this.angle}`,this.pos.x,this.pos.y+20)

        // this.ctx.fillStyle = "#FF0000";
        //  this.ctx.beginPath();
        //     this.ctx.moveTo(this.pos.x, this.pos.y);
        //     this.ctx.lineTo(this.pos.x+(this.dir.x)*this.speed, this.pos.y+(this.dir.y)*this.speed);
        //     this.ctx.stroke();

        // for (let i = 0; i < this.rays.length; i++) {
        //     this.rays[i].show()
        // }
        // const a=this.pos.x-this.pos.x+this.dir.x
        // const b=this.pos.y-this.pos.y+this.dir.y
        // const radians=Math.atan2(a,b)
        //  let degrees = (radians * 180) / Math.PI - 90; // rotate

        //    while (degrees >= 360) degrees -= 360;
        //    while (degrees < 0) degrees += 360;

        //this.writeTextToCanvas(`${degrees} `,this.pos.x,this.pos.y+50)

    }
    look(borders: Array<Border>) {

        for (let ray of this.rays) {
            let closest = { x: -1, y: -1 }
            let record = Infinity



            for (let border of borders) {

                const p = ray.cast(border)

                if (p) {

                    //reken distance tussen particle en point op border


                    const a = p.x - this.pos.x
                    const b = p.y - this.pos.y
                    const d = Math.sqrt((a * a) + (b * b))



                    if (d <= record) {
                        //this.writeTextToCanvas(Math.round(d),p.x,p.y+30)

                        //console.log("record: "+ record, "newD: " + Math.round(d))
                        record = d
                        closest.x = p.x
                        closest.y = p.y
                    }
                }

            }
            if (closest.x != -1) {
                this.ctx.fillStyle = "#FF0000";
                // this.ctx.fillRect(closest.x, closest.y, 10, 10);


                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.ctx.lineTo(closest.x, closest.y);
                this.ctx.stroke();
                this.ctx.closePath()
                this.ctx.fill()



            }


        }

    }
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = 'center',
        color: string = 'white',
      ): void {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
      }
}