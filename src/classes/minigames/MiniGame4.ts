import Room from "../Room";
import MGMain from "./MGMain";
 import Game from "../Game";

export default class MiniGame4 extends MGMain{
   
   
    
    /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(4,room,ctx, canvas,["3","4","2","4","m","e","s","s","i"],[null,null,null,null,null,null,null,null,null])
     

      this.fname="Lionel"
      this.lname="Messi"
      this.age=34
      this.birth="24/06/1987"
      this.habitat="Parijs"
     
    }


 

  /**
   * Functie om de game te updaten
   */
    public update(elapsed:number){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      this.timer(elapsed)
      if(this.started){
        document.onkeydown = this.checkKey.bind(this);
        this.started=false
      }

      if(this.timeLeft<0){
        this.complete=5
        setTimeout(this.answerWrong.bind(this), 2000);
  
        }

    }

    /**
     * Functie om de minigame te renderen
     */
    public render(){
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)

      this.renderAttemptsBlock()
      this.renderInfoBlock()
      this.renderPassBlocks()
      this.renderStreepIndex()
      this.renderComplete()
    
    


     //timer
	  this.renderTime()

        
    }

}
