import Border from "./Border";
import Particle from "./Particle";
import Ray from "./Ray";
import Vector from "./Vector";
import Game from "./Game"
export default class Agent{

    public ctx: CanvasRenderingContext2D;

    public pos :Vector;

    public rays: Array<any> = []

    public radius: number;

    public speed: number;

    public dir = <any>{};

    public mouse = <any>{};

    public angleView: number;

    public vel:Vector;
    public acc:Vector;

    public maxspeed:number;
    public widthHall:number

    public target:Vector;

    public lastAngle:number;

    public viewRays:Array<Ray>;
    public sight:number;

    //random or searching blauw/groen sight
    public mode:string;

    public checkAngle:number;

    public checkRays: Array<Ray>=[];

    public keyNum:number

    //moeilijkheidsgraad defense geel,oranje,rood
    public status:string

    public hackRange:number;

    private goldkeyImg:HTMLImageElement

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, widthHall:number,mode:string,keyNum:number,status:string) {
        this.ctx = ctx;
        this.keyNum=keyNum
        this.mode=mode
        this.pos = new Vector(x,y)
        //this.goldkeyImg=Game.loadNewImage("./assets/img/objects/goldkey.png")
        this.goldkeyImg = new Image();
        this.goldkeyImg.src = "./img/objects/goldkey.png"
    
        this.rays = []
        this.radius = 10
        this.speed = 1
        this.dir = { x: 0, y: 0 }
        this.mouse = { x: 0, y: 0 }
        this.angleView = 18;
         this.maxspeed=1
        this.vel=new Vector(0,0)
        this.acc=new Vector(0,0)
        this.widthHall=widthHall
         this.lastAngle=0;
         for(let i=0;i<360;i+=90){
             this.rays.push( new Ray(this.pos,i,this.ctx))
         }
         this.target=new Vector(x,y)
         this.viewRays=[]
         this.sight=80;
         this.checkAngle=8;
         this.status=status
         this.hackRange=0

         if(status==="yellow"){
             this.hackRange=100
         }else if(status==="orange"){
             this.hackRange=80
         }else if(status==="red"){
             this.hackRange=60
         }
         




    }

    applyforce(force:Vector){
        this.acc.add(force)
      }

    update(particle:Particle, borders: Array<Border>) {


        this.dir = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y }

        const a = this.pos.x - this.pos.x + this.dir.x
        const b = this.pos.y - this.pos.y + this.dir.y
        const d = Math.sqrt((a * a) + (b * b))

        const radians = Math.atan2(a, b)
        let degrees = (radians * 180) / Math.PI - 90; // rotate


        while (degrees >= 360) degrees -= 360;
        while (degrees < 0) degrees += 360;
 
        this.lastAngle=degrees

        let walk = true;
        //l r u d=0 1 2 3
        let options=[
            {x:+this.widthHall,y:0,angle:0},
            {x:0,y:-this.widthHall,angle:90},
            {x:-this.widthHall,y:0,angle:180},
            {x:0,y:+this.widthHall,angle:270},

        ];
        let open=[]
        let opt=0;

        if (this.rays.length > 0) {
            for(let i=0;i<options.length;i++){
                let clear=this.check90(options[i].angle,borders)
                if(clear){
                    open.push(i)
                    opt+=1
                }
            }
        //     for (let j = 0; j < this.rays.length; j++) {
        //         let closest = { x: -1, y: -1 }
        //         let record = Infinity
        //         let type=""
        //     for (let i = 0; i < borders.length; i++) {
        //         let pt = this.rays[j].cast(borders[i])
        //         if (pt) {
        //             let a = pt.x - this.pos.x
        //             let b = pt.y - this.pos.y
        //             let d = Math.sqrt(a * a + b * b)
        //             if (d <record) {
        //                 record=d
        //                 closest=pt
        //                 type=borders[i].type
                    
                      
        //             }
                    
        //         }
        //     }
        //     if(record>this.widthHall+4&&this.inv(options[j].angle)!=this.lastAngle){
        //         open.push(j)
        //         opt+=1
        //     }
            
        // }
        }
         if(opt>0&&this.mode==="random"){
        let pick = Math.random()*(opt-1)
       // console.log(pick)
       // console.log(open)
       let picked=open[Math.round(pick )]
       //let picked=open[Math.floor(pick)]
       //console.log(picked)
       let todo=options[picked]
       //this.lastAngle=todo.angle
       //console.log(todo)
      // console.log(Vector.dist(this.pos,this.target))
     if(Vector.dist(this.pos,this.target)<=this.radius*2){
       this.target.x=this.pos.x+todo.x
       this.target.y=this.pos.y+todo.y
       
       }
    }else if(opt>0&&this.mode==="search"){
    //    this.target.x=particle.pos.x;
    //    this.target.y=particle.pos.y;
    let record=Infinity;
    let nextTarget=new Vector(0,0)
       for(let i=0;i<open.length;i++){
           let potential=new Vector(0,0)
           potential.x=this.pos.x+options[open[i]].x
           potential.y=this.pos.y+options[open[i]].y

           
          
           let d=Vector.dist(potential,particle.pos)
           if(d<record){
               record=d
               nextTarget.x=this.pos.x+options[open[i]].x;
               nextTarget.y=this.pos.y+options[open[i]].y
           }

       }
       if(Vector.dist(this.pos,this.target)<=this.radius*2){
        this.target.x=nextTarget.x;
       this.target.y=nextTarget.y;
        
        }
      


    }



       
       //this.angleView = degrees



        this.viewRays = []

        for (let i =  degrees- this.angleView; i < degrees; i++) {
            this.viewRays.push(new Ray(this.pos, i, this.ctx))

        }
        for (let i = degrees; i <degrees+this.angleView; i++) {
            this.viewRays.push(new Ray(this.pos, i, this.ctx))

        }



        this.dir.x = (this.dir.x / d) * this.speed
        this.dir.y = (this.dir.y / d) * this.speed

        if (d > 20 && walk) {


            // this.pos.x += this.dir.x
            // this.pos.y += this.dir.y
            this.applyforce(this.dir)
        }else{
            this.vel.setMag(0)
            this.acc.setMag(0)
        }

    }


    check90(angle:number, borders: Array<Border>){
        let clear=true;

        this.checkRays=[];

        for (let i =  angle- this.checkAngle; i < angle; i++) {
            this.checkRays.push(new Ray(this.pos, i, this.ctx))

        }
        for (let i = angle; i <angle+this.checkAngle; i++) {
            this.checkRays.push(new Ray(this.pos, i, this.ctx))

        }
        
       
        for (let j = 0; j <this.checkRays.length; j++) {
            let closest = { x: -1, y: -1 }
            let record = Infinity
            let type=""
        for (let i = 0; i < borders.length; i++) {
            let pt = this.checkRays[j].cast(borders[i])
            if (pt) {
                let a = pt.x - this.pos.x
                let b = pt.y - this.pos.y
                let d = Math.sqrt(a * a + b * b)
                if (d <record) {
                    record=d
                    closest=pt
                    type=borders[i].type
                
                  
                }
                
            }
        }
        if(record>this.widthHall-8&&this.inv(angle)!=this.lastAngle){
            
        }else{
return false
        }
    
        
    }
    return true




    }

    inv(angle:number):number{
        if(angle===0){
            return 180
        }
        if(angle===90){
            return 270
        }
        if(angle===180){
            return 0
        }
        if(angle===270){
            return 90
        }
        //console.log("yo")
        return angle

    }

    move(){

        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.maxspeed)
        
        this.acc.setMag(0)


    }
    show(ctx:CanvasRenderingContext2D) {
        
        this.ctx.drawImage(this.goldkeyImg,0,0,this.goldkeyImg.width,this.goldkeyImg.height,this.pos.x-20,this.pos.y-35,30,30)
        this.writeTextToCanvas(`${this.keyNum}`,20,this.pos.x+15,this.pos.y-10)
        let color="yellow"
        if(this.status==="yellow"){
            color="rgb(255,255,0)"
        }else if(this.status==="orange"){
            color="rgb(255, 165, 0)"
        }else if(this.status==="red"){
            color="rgb(255, 0, 0)"
        }
        if(this.mode==="random"){
        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath()
        ctx.fill()
    }else{
        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath()
        ctx.fill()

    }

        //this.writeTextToCanvas(`${this.angle}`,this.pos.x,this.pos.y+20)

        // this.ctx.fillStyle = "#FF0000";
        //  this.ctx.beginPath();
        //     this.ctx.moveTo(this.pos.x, this.pos.y);
        //     this.ctx.lineTo(this.pos.x+(this.dir.x)*this.speed, this.pos.y+(this.dir.y)*this.speed);
        //     this.ctx.stroke();

        // for (let i = 0; i < this.rays.length; i++) {
        //     this.viewRays[i].show()
        // }
        // const a=this.pos.x-this.pos.x+this.dir.x
        // const b=this.pos.y-this.pos.y+this.dir.y
        // const radians=Math.atan2(a,b)
        //  let degrees = (radians * 180) / Math.PI - 90; // rotate

        //    while (degrees >= 360) degrees -= 360;
        //    while (degrees < 0) degrees += 360;

        //this.writeTextToCanvas(`${degrees} `,this.pos.x,this.pos.y+50)

    }
    look(borders: Array<Border>,ctx:CanvasRenderingContext2D) {

        for (let ray of this.viewRays) {
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
                if(this.mode==="random"){
                ctx.strokeStyle = "rgb(0,0,255)";
                // this.ctx.fillRect(closest.x, closest.y, 10, 10);

                 
                 let rv=new Vector(closest.x,closest.y)
                 rv.sub(this.pos)

                 rv.limit(this.sight)
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(this.pos.x+rv.x, this.pos.y+rv.y);
                ctx.stroke();
                ctx.closePath()
                ctx.fill()
                }else{
                    ctx.strokeStyle = "rgb(0,255,0)";
                    // this.ctx.fillRect(closest.x, closest.y, 10, 10);
    
                     
                     let rv=new Vector(closest.x,closest.y)
                     rv.sub(this.pos)
    
                     rv.limit(this.sight)
                    ctx.beginPath();
                    ctx.moveTo(this.pos.x, this.pos.y);
                    ctx.lineTo(this.pos.x+rv.x, this.pos.y+rv.y);
                    ctx.stroke();
                    ctx.closePath()
                    ctx.fill()

                }

               
        //this.writeTextToCanvas(ray.angle,20,closest.x,closest.y)



            }


        }

    }

    inSight(particle:Particle,ctx:CanvasRenderingContext2D){

        let lines=[
            new Border(particle.pos.x,particle.pos.y-particle.radius,particle.pos.x,particle.pos.y+particle.radius,ctx,"particle"),
            new Border(particle.pos.x-particle.radius,particle.pos.y,particle.pos.x+particle.radius,particle.pos.y,ctx,"particle")
        ]
        let gotya=false

        for (let ray of this.viewRays) {
            let closest = { x: -1, y: -1 }
            let record = this.sight



            for (let border of lines) {

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
                //ctx.fillStyle = "#FF0000";
                // this.ctx.fillRect(closest.x, closest.y, 10, 10);
              gotya=true
                 
                // let rv=new Vector(closest.x,closest.y)
                 //rv.sub(this.pos)

                // rv.setMag(this.sight+20)
                // ctx.beginPath();
                // ctx.moveTo(this.pos.x, this.pos.y);
                // ctx.lineTo(this.pos.x+rv.x, this.pos.y+rv.y);
                // ctx.stroke();
                // ctx.closePath()
                // ctx.fill()
               // this.writeTextToCanvas("!",20,this.pos.x+rv.x,this.pos.y+rv.y,'center',"red")

               
        //this.writeTextToCanvas(ray.angle,20,closest.x,closest.y)



            }


        }
        if(gotya){
            
                // this.ctx.fillRect(closest.x, closest.y, 10, 10);
             
                 
                 let rv=new Vector(this.target.x,this.target.y)
                 rv.sub(this.pos)

                 rv.setMag(this.sight+20)
                // ctx.beginPath();
                // ctx.moveTo(this.pos.x, this.pos.y);
                // ctx.lineTo(this.pos.x+rv.x, this.pos.y+rv.y);
                // ctx.stroke();
                // ctx.closePath()
                // ctx.fill()
                this.writeTextToCanvas("!",20,this.pos.x+rv.x,this.pos.y+rv.y,'center',"red")

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