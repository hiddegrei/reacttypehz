import Room from "../Room";
import MGMain from "./MGMain";
 import Game from "../Game";

export default class MiniGame4 extends MGMain{
   private counter: number;
   private increase: boolean;
   private line: number;
    
    /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(4,room,ctx, canvas);
      this.counter = 0;
      this.increase = true;
      this.line = 1;
    }


  

  /**
   * Functie om de game te updaten
   */
    public update(elapsed:number){
      
      this.increaseOrDecrease();
      this.counterChange(this.line);
      this.timer(elapsed)
      if(this.started){
        document.onkeydown = this.checkKey.bind(this);
        this.started=false
      }
      if(this.timeLeft<=0){
        this.complete=5
        setTimeout(this.answerWrong.bind(this), 2000);
  
        }

    }

    /**
     * Functie om de minigame te renderen
     */
    public render(){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
      for (let i = 1; i < 3; i++) {
        this.drawLines(i);
      }
      this.moveLine(this.line);
      
    
    


      //timer
	    this.renderTime()
        
    }

    private checkKeyStop(e:any) {
      if (e.keyCode === 40 && (this.line===1 || this.line===2)) {
        
      }
    }

    private moveLine(line: number){
      if (line === 1) {
        this.drawCube(150);
        this.drawNoMoveCube(1);
        this.drawNoMoveCube(2);
      } else if (line === 2) {
        this.drawCube(300);
        this.drawNoMoveCube(0);
        this.drawNoMoveCube(2);
      } else if (line === 3) {
        this.drawCube(450);
        this.drawNoMoveCube(1);
        this.drawNoMoveCube(0);
      }
    }

    private drawCube(dy: number) {
      this.ctx.strokeStyle = "rgb(0,0,0)"
      this.ctx.fillStyle = "rgb(255,255,255)"
      this.ctx.beginPath()
      this.ctx.rect(840+this.counter, dy, 20, 50)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.fill()
    }

    private drawNoMoveCube(line: number) {
      this.ctx.strokeStyle = "rgb(0,0,0)"
      this.ctx.fillStyle = "rgb(255,255,255)"
      this.ctx.beginPath()
      this.ctx.rect(900, 150 + (150 * line), 20, 50)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.fill()
    }

    private increaseOrDecrease() {
      if (this.counter <=0) {
        this.increase = true;
      } else if (this.counter >=500) {
        this.increase = false;
      }
    }

    private drawLines(line: number) {
      this.ctx.strokeStyle = "rgb(0,0,0)";
      this.ctx.beginPath();
      this.ctx.moveTo(890, 175 + (150 * line));
      this.ctx.lineTo(1410, 175 + (150*line));
      this.ctx.stroke();
    }

    private counterChange(speed: number){
      if (this.increase === true) {
        this.counter += speed;
      } else {
        this.counter -= speed;
      }
    }

     
}
