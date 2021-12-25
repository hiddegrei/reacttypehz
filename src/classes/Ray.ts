import Vector from "./Vector";

export default class Ray {

    public pos = <any>{};
    public lenghtDir: number;
    public dir = <any>{};
    public ctx: CanvasRenderingContext2D;
    public p = <any>{};
    public angle:number

    constructor(pos: Vector, angle: number, ctx: CanvasRenderingContext2D) {
        this.angle=angle
        this.pos = pos;
        this.lenghtDir = 50
        this.dir = { x: Math.cos((angle / 360) * 2 * Math.PI), y: Math.sin((angle / 360) * 2 * Math.PI) };
        this.ctx = ctx;
        this.p = { x: null, y: null }

        const l = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y)
        this.dir.x = (this.dir.x / l) * this.lenghtDir
        this.dir.y = (this.dir.y / l) * this.lenghtDir * -1

    }

    show() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "rgb(255,0,0)";
        this.ctx.beginPath();
        this.ctx.moveTo(this.pos.x, this.pos.y);
        this.ctx.lineTo(this.pos.x + this.dir.x, this.pos.y + this.dir.y);
        this.ctx.stroke();
        


    }

    lookAt(mx: number, my: number) {
        this.dir.x = mx - this.pos.x;
        this.dir.y = my - this.pos.y
    }

    cast(border: { a: Vector; b: Vector; }) {
        const x1 = border.a.x
        const y1 = border.a.y
        const x2 = border.b.x
        const y2 = border.b.y

        const x3 = this.pos.x
        const y3 = this.pos.y
        const x4 = this.pos.x + this.dir.x
        const y4 = this.pos.y + this.dir.y

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den === 0) {
            return false
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {

            this.p.x = x1 + t * (x2 - x1)
            this.p.y = y1 + t * (y2 - y1)
            return this.p
        } else {
            return false
        }



    }
    writeTextToCanvas(text: any, xCoordinate: any, yCoordinate: any, fontSize = 20, color = 'red', alignment = 'center') {

        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        //this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}