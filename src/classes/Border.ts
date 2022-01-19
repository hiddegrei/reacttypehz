import Vector from "./Vector";
import Game from "./Game"
export default class Border {

  public a:Vector;
  public b :Vector;
  public ctx: CanvasRenderingContext2D;
  public type:string
  public imageV:HTMLImageElement


  constructor(x1: number, y1: number, x2: number, y2: number, ctx: CanvasRenderingContext2D,type:string) {
    this.a = new Vector(x1,y1)
    this.b = new Vector(x2,y2)
    this.type=type

    this.ctx = ctx;
    this.type=type
    //this.imageV=Game.loadNewImage("./assets/img/objects/walls1.png")
    this.imageV = new Image();
    this.imageV.src = "./img/objects/walls1.png"

  }

  show() {
    if(this.type==="normal"){
    this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()
    if(this.a.y===this.b.y){
      let diffx=Math.abs(this.b.x-this.a.x)
      if(diffx<=100){
        this.ctx.drawImage(this.imageV,50,0,100,10,this.a.x,this.a.y-5,Math.abs(this.b.x-this.a.x),10)

      }else{
        
        for(let i=0;i<diffx;i+=50){

          
           if(i+50>diffx){
             this.ctx.drawImage(this.imageV,50,0,100,10,this.a.x+i,this.a.y-5,diffx-i,10)

           }else{
            this.ctx.drawImage(this.imageV,50,0,100,10,this.a.x+i,this.a.y-5,50,10)

           }

        }
      }
      
        
    
    }else{
      if(this.b.y>this.a.y){
        let diffy=Math.abs(this.b.y-this.a.y)
      if(diffy<=100){
        this.ctx.drawImage(this.imageV,0,0,10,100,this.a.x-5,this.a.y,10,diffy)

      }else{
        
        for(let i=0;i<diffy;i+=50){

          
           if(i+50>diffy){
             this.ctx.drawImage(this.imageV,0,0,10,100,this.a.x-5,this.a.y+i,10,diffy-i)

           }else{
            this.ctx.drawImage(this.imageV,0,0,10,100,this.a.x-5,this.a.y+i,10,50)

           }

        }
      }

      }else{
        let diffy=Math.abs(this.b.y-this.a.y)
        if(diffy<=100){
          this.ctx.drawImage(this.imageV,0,0,10,100,this.a.x-5,this.b.y,10,diffy)
  
        }else{
          
          for(let i=0;i<diffy;i+=50){
  
            
             if(i+50>diffy){
               this.ctx.drawImage(this.imageV,0,0,10,100,this.a.x-5,this.b.y+i,10,diffy-i)
  
             }else{
              this.ctx.drawImage(this.imageV,0,0,10,100,this.a.x-5,this.b.y+i,10,50)
  
             }
  
          }
        }
      }
      
     

    }
    }else{
      if(this.type==="door"){
      this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()
      }
    }
  }
}