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

    private colorSight:string

    

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.pos = new Vector(x,y)
        this.rays = []
        this.radius = 5
        this.speed = 2;
        this.maxspeed=2.5
        this.dir = { x: 0, y: 0 }
        this.mouse = { x: 0, y: 0 }
        this.angleView = 18;
        this.imageSprite=Game.loadNewImage("./img/players/bkspr01.png")
        this.colorSight="green"
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
        this.hackIndex=10
       
       
        

        //  for(let i=0;i<360;i+=1){
        //      this.rays.push( new Ray(this.pos,i,this.ctx))
        //  }


    }

    /**
     * steer particle
     * @param force vector
     */
    public applyforce(force:Vector){
        this.acc.add(force)
      }

    public getAngleDeg(ax: number, ay: number, bx: number, by: number) {
        var angleRad = Math.atan((ay - by) / (ax - bx));
        var angleDeg = angleRad * 180 / Math.PI;

        return (angleDeg);
    }

    /**
     * check if player is inside a room
     * @param rooms rooms
     * @returns 
     */
    public isInRoom(rooms:Array<any>): number {
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

        let a = 0;
        let b = 0;
        let d = 0;
        let pt;
        if (this.rays.length > 0) {
            for (let j = 0; j < this.rays.length; j++) {
                for (let i = 0; i < borders.length; i++) {
                    if(borders[i].type==="normal"){
                        pt = this.rays[j].cast(borders[i]);
                        if (pt) {
                            a = pt.x - this.pos.x;
                            b = pt.y - this.pos.y;
                            d = Math.sqrt(a * a + b * b);
                            if ((Math.abs(a) < this.radius + 5) === true && (Math.abs(b) < this.radius + 5) === true) {
                                // this.vel.x = 0;
                                this.vel.y = 0;
                            } else if ((Math.abs(a) < this.radius + 5) === true && (Math.abs(b) < this.radius + 5) === false) {
                                // this.vel.x = 0;
                                this.vel.x = 0;
                            } else if ((Math.abs(a) < this.radius + 5) === false && (Math.abs(b) < this.radius + 5) === true) {
                                // this.vel.x = 0;
                                this.vel.y = 0;
                            // } else if ((Math.abs(a) < this.radius + 5) === false && (Math.abs(b) < this.radius + 5) === false) {
                            }
                            // if (d < this.radius+10) {
                            //     this.walk = false;
                            // }
                        }
                    }
                }
            }
        }
        // if (this.rays.length > 0) {
        //     for (let j = 0; j < this.rays.length; j++) {
        //         for (let i = 0; i < borders.length; i++) {
        //             if(borders[i].type==="normal"){
        //                 let pt = this.rays[j].cast(borders[i]);
        //                 if (pt) {
        //                     let a = pt.x - this.pos.x;
        //                     let b = pt.y - this.pos.y;
        //                     let d = Math.sqrt(a * a + b * b);
        //                     if (d < this.radius+10) {
        //                         this.walk = false;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }



        this.dir = { x: mx - this.pos.x, y: my - this.pos.y }

        const K = this.pos.x - this.pos.x + this.dir.x
        const L = this.pos.y - this.pos.y + this.dir.y
        const M = Math.sqrt((K * K) + (L * L))
        // document.querySelectorAll('div#progress.hud')[0].innerHTML = `
        // Position: <br>
        // ${JSON.stringify(Math.round(this.pos.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.pos.y * 10) / 10)}<br>
        // <br>
        // Velocity: <br>
        // ${JSON.stringify(Math.round(this.vel.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.vel.y * 10) / 10)}<br>
        // <br>
        // Direction: <br>
        // ${JSON.stringify(Math.round(this.dir.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.dir.y * 10) / 10)}<br>
        // <br>
        // A: ${JSON.stringify(Math.round(a * 10) / 10)}<br>
        // B: ${JSON.stringify(Math.round(b * 10) / 10)}<br>
        // D: ${JSON.stringify(Math.round(d * 10) / 10)}<br>
        // dA: ${JSON.stringify(Math.round((d - a) * 10) / 10)}<br>
        // dB: ${JSON.stringify(Math.round((d - b) * 10) / 10)}<br>
        // K: ${JSON.stringify(Math.round(K * 10) / 10)}<br>
        // L: ${JSON.stringify(Math.round(L * 10) / 10)}<br>
        // M: ${JSON.stringify(Math.round(M * 10) / 10)}<br>
        // dK: ${JSON.stringify(Math.round((M - K) * 10) / 10)}<br>
        // dL: ${JSON.stringify(Math.round((M - L) * 10) / 10)}<br>
        // PT: ${JSON.stringify(this.walk)}<br>
        // `;

        const radians = Math.atan2(K, L)
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



        this.dir.x = (this.dir.x / M) * this.speed
        this.dir.y = (this.dir.y / M) * this.speed



        if (this.walk) {
            this.applyforce(this.dir)
        } else {
            this.vel.setMag(0)
            this.acc.setMag(0)
        }

        // if (d > 5 && this.walk) {
        //     this.applyforce(this.dir)
        // } else{
        //     this.vel.setMag(0)
        //     this.acc.setMag(0)
        // }








        
        // document.querySelectorAll('div#progress.hud')[0].innerHTML = `
        // Position: <br>
        // ${JSON.stringify(Math.round(this.pos.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.pos.y * 10) / 10)}<br>
        // <br>
        // Velocity: <br>
        // ${JSON.stringify(Math.round(this.vel.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.vel.y * 10) / 10)}<br>
        // <br>
        // Direction: <br>
        // ${JSON.stringify(Math.round(this.dir.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.dir.y * 10) / 10)}<br>
        // <br>
        // A: ${JSON.stringify(Math.round(a * 10) / 10)}<br>
        // B: ${JSON.stringify(Math.round(b * 10) / 10)}<br>
        // D: ${JSON.stringify(Math.round(d * 10) / 10)}<br>
        // dA: ${JSON.stringify(Math.round((d - a) * 10) / 10)}<br>
        // dB: ${JSON.stringify(Math.round((d - b) * 10) / 10)}<br>
        // PT: ${JSON.stringify(pt)}<br>
        // `;
        
        // PT: ${JSON.stringify(Math.round(pt * 10) / 10)}<br>
        // <br>
        // Acceleration: <br>
        // ${JSON.stringify(Math.round(this.acc.x * 10) / 10)}<br>
        // ${JSON.stringify(Math.round(this.acc.y * 10) / 10)}<br>
    }

    hack(agents:Array<Agent>){
        for(let i=0;i<agents.length;i++){
            
            if(Vector.dist(this.pos,agents[i].pos)<agents[i].hackRange&&agents[i].sleeping!=true){
                 
        this.colorSight=agents[i].status
        this.hackRange=agents[i].hackRange
        this.hacking=true
        this.hackAgent=i
        return;




            }
        }
        this.hacking=false
        
        
    }

    animate(){
        this.imgIndex+=0.1
        this.hackIndex+=0.5
    }


    show(show:boolean,color:string) {
        // this.ctx.lineWidth = 1;
        // this.ctx.fillStyle = "rgb(255,255,255)";
        // this.ctx.beginPath();
        // this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        // this.ctx.stroke();
        // this.ctx.closePath()
        if(this.hacking){
            color=this.colorSight
        }
        // this.ctx.fill()
        if(this.hacking||show){
            this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, Math.ceil(this.hackIndex)%this.hackRange, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath()

        if(this.hacking){
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.hackRange, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath()
        }
       
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