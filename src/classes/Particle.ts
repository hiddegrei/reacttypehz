import Agent from "./Agent";
import Border from "./Border";
import Game from "./Game";
import Ray from "./Ray";
import Scene from "./Scene"
import Vector from "./Vector";
export default class Particle {
    public static readonly WP=95/2
    public static readonly HP=130/2
    public ctx: CanvasRenderingContext2D;

    public pos = <any>{};

    public rays: Array<any> = []

    public radius: number;

    public speed: number;

    public dir = <any>{};

    public mouse = <any>{};

    public angleView: number;
    
    private imageSprite:HTMLImageElement;

    private images:Array<any>=[];

    private imgIndex:number

    private dirAngle!: number;

    private walk:boolean

    public vel:Vector;
    public acc:Vector;

    public maxspeed:number;

    public hacking:boolean;

    public hackAgent!: number;

    private hackRange:number

    private hackIndex:number

    

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.pos = new Vector(x,y)
        this.rays = []
        this.radius = 10
        this.speed = 2;
        this.maxspeed=3
        this.dir = { x: 0, y: 0 }
        this.mouse = { x: 0, y: 0 }
        this.angleView = 18;
        //this.imageSprite=Game.loadNewImage("./img/players/bkspr01.png")
        this.imageSprite = new Image();
        this.imageSprite.src = "./img/players/bkspr01.png"
       
        console.log(this.imageSprite.width,this.imageSprite.height)
        this.images.push([20,150,95,130,300,300,Particle.WP,Particle.HP])
        this.images.push([132,50,95,130,300,300,Particle.WP,Particle.HP])
        this.images.push([ 132,270,95,130,300,300,Particle.WP,Particle.HP])
        this.images.push([20,290,95,130,300,300,Particle.WP,Particle.HP])
        this.imgIndex=0
        this.walk=false;
        this.vel=new Vector(0,0)
        this.acc=new Vector(0,0)
        this.hacking=false
        this.hackRange=80
        this.hackIndex=0
       
       
        

        //  for(let i=0;i<360;i+=1){
        //      this.rays.push( new Ray(this.pos,i,this.ctx))
        //  }


    }

    applyforce(force:Vector){
        this.acc.add(force)
      }

    getAngleDeg(ax: number, ay: number, bx: number, by: number) {
        var angleRad = Math.atan((ay - by) / (ax - bx));
        var angleDeg = angleRad * 180 / Math.PI;

        return (angleDeg);
    }

    isInRoom(rooms:Array<any>): number {
        for(let i=0;i<rooms.length;i++){
            let roomV={x:rooms[i][0],y:rooms[i][1]}

       if(Vector.dist(this.pos,roomV)<this.radius*2){
           console.log("im inside room: ",rooms[i][2])
           return +rooms[i][2];
       }

        }
        return -1
        


    }

    move(){

        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.maxspeed)
        
        this.acc.setMag(0)


    }

    update(mx: number, my: number, borders: Array<Border>) {

        this.walk=true

        if (this.rays.length > 0) {
            for (let j = 0; j < this.rays.length; j++) {
            for (let i = 0; i < borders.length; i++) {
                if(borders[i].type==="normal"){
                let pt = this.rays[j].cast(borders[i])
                if (pt) {
                    let a = pt.x - this.pos.x
                    let b = pt.y - this.pos.y
                    let d = Math.sqrt(a * a + b * b)
                    if (d < this.radius+10) {
                        this.walk = false

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

        this.dirAngle = degrees



        this.rays = []

        for (let i = degrees - this.angleView; i < degrees; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx))

        }
        for (let i = degrees; i < degrees + this.angleView; i++) {
            this.rays.push(new Ray(this.pos, i, this.ctx))

        }



        this.dir.x = (this.dir.x / d) * this.speed
        this.dir.y = (this.dir.y / d) * this.speed

        // if (d > 20 && this.walk) {


        //     this.pos.x += this.dir.x
        //     this.pos.y += this.dir.y
        // }

        if (d > 20 && this.walk) {


            // this.pos.x += this.dir.x
            // this.pos.y += this.dir.y
            this.applyforce(this.dir)
        }else{
            this.vel.setMag(0)
            this.acc.setMag(0)
        }
    }

    hack(agents:Array<Agent>){
        for(let i=0;i<agents.length;i++){
            
            if(Vector.dist(this.pos,agents[i].pos)<agents[i].hackRange){
                 

        this.hacking=true
        this.hackAgent=i
        return;




            }
        }
        this.hacking=false
        
        
    }

    animate(){
        this.imgIndex+=0.05
        this.hackIndex+=1
    }


    show() {
        // this.ctx.lineWidth = 1;
        // this.ctx.fillStyle = "rgb(255,255,255)";
        // this.ctx.beginPath();
        // this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        // this.ctx.stroke();
        // this.ctx.closePath()
        // this.ctx.fill()
        if(this.hacking){
            this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "rgb(0,255,0)";
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, Math.ceil(this.hackIndex)%this.hackRange, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath()
       
        }

      

        

        this.ctx.save();
        this.ctx.translate(this.pos.x,this.pos.y);
        this.ctx.rotate(-(this.dirAngle*Math.PI)/180+(0.5*Math.PI));
        if(this.vel.dist()!=0){
        this.ctx.drawImage(this.imageSprite,this.images[Math.ceil(this.imgIndex)%this.images.length][0],
                this.images[Math.ceil(this.imgIndex)%this.images.length][1],
                this.images[Math.ceil(this.imgIndex)%this.images.length][2],
                this.images[Math.ceil(this.imgIndex)%this.images.length][3],
                -Particle.WP/2,
                -Particle.HP/2,
                this.images[Math.ceil(this.imgIndex)%this.images.length][6],
                this.images[Math.ceil(this.imgIndex)%this.images.length][7])
    }else{
        this.ctx.drawImage(this.imageSprite,20,
                50,
                95,
                50,
                -Particle.WP/2,
                -(50/2)/2,
                Particle.WP,
                50/2)

    }
        this.ctx.restore();

           

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
                //this.ctx.fillStyle = "#FF0000";
                // this.ctx.fillRect(closest.x, closest.y, 10, 10);


                // this.ctx.beginPath();
                // this.ctx.moveTo(this.pos.x, this.pos.y);
                // this.ctx.lineTo(closest.x, closest.y);
                // this.ctx.stroke();
                // this.ctx.closePath()
                // this.ctx.fill()



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