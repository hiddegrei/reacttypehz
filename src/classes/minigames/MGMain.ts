import Game from "../Game";
import KeyboardListener from "../KeyboardListener";
import Room from "../Room";

export default class MGMain{
    public roomId:number;
    public room:Room;
    public keyboard:KeyboardListener;
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    private bezig:boolean;
    public timeLeft:number;

    public secretW:Array<string>=[];
    public attempts:number;
    public found:any[];
    public index:number;
    public complete:any;
    public attemptsArr:Array<string>=[];
    public foundStr:string;
    public started:boolean;
    public image!: HTMLImageElement;

    /**
     * Create an instance of this object
     * @param roomId number of the room the player is in
     * @param ctx canvas rendering context 2D
     * @param room A room
     * @param canvas canvas
     */
    constructor(roomId:number,room:Room, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement,secret:string[]=[],found:any[]=[]){
        this.roomId=roomId;
        this.room=room;
        this.keyboard=new KeyboardListener();
        this.ctx = ctx;
        this.canvas = canvas;
        this.bezig=true
        this.timeLeft=120000

        this.secretW=secret;
      	this.found=found;
        this.index=0;
      	this.attempts=5;
      	this.foundStr="";
     	// this.complete=false;
     	this.started=true;
     	this.image = Game.loadNewImage("./img/background/password2.jpg");
    }

    /**
	 * Functie die bepaalt wat er gebeurt als het antwoord goed is
	 */
     public answer(){
         if(this.bezig){
             this.bezig=false
        this.room.answer = true;
        this.room.miniGameFinished = true;
        this.room.mgTimeLeft=this.timeLeft
         }
       
      //   this.room.getHintsGame().foundHint('R');
      }

      	/**
	 * functie die bepaalt wat er gebeurt als het antwoord fout is
	 */
    public answerWrong(){
        this.room.answer = false;
        this.room.miniGameFinished = true;
       
      }

      public timer(elapsed:number){
          this.timeLeft-=elapsed
          

      }
      public renderTime(){
        this.writeTextToCanvas(`Time left: ${Math.round(this.timeLeft/1000)}`,20,100,60,"start","green")

      }

    /**
	 * Checks de keys pressed
	 * @param e Key pressed
	 */
  	public checkKey(e:any) {
      //console.log(e.keyCode);
      if(e.keyCode===8){
        this.found[this.index--]=null;
        //this.index--;
      }else if(e.keyCode===13){
        this.checkAttempt();
      }else if(this.index<=7){
        for(let i=0;i<this.found.length;i++){
            if(this.found[i]===null){
              this.index=i;
              break;
            }
        }
      
        if(e.keyCode<=57){
            this.found[this.index]=String.fromCharCode(e.keyCode);
        }else{
            this.found[this.index]=String.fromCharCode(e.keyCode+32);
        }
        this.index++;
      }
  }

  /**
	 * Checkt the attempt
	 */
   public checkAttempt(){
    for(let i=0;i<this.found.length;i++){
        this.foundStr+=this.found[i];
    }
    this.attemptsArr.push(this.foundStr);
    this.foundStr="";

    let complete=true;
    if(this.attempts>1){
      for(let i=0;i<this.secretW.length;i++){
          if(this.found[i]===this.secretW[i]){
            this.found[i]=this.secretW[i];
          }else{
            this.found[i]=null;
            complete=false;
          }
      }
      for(let i=0;i<this.found.length;i++){
          if(this.found[i]===null){
            this.index=i;
            break;
          }
      }
      this.attempts--;
      if(complete){
        
          this.complete=true;
   
          //setTimeout(this.answer,2000);
          setTimeout(this.answer.bind(this), 2000);
          //this.answer();
      }

    }else{
      
       
      this.complete=0;
      setTimeout(this.answerWrong.bind(this), 2000);
      
       //this.answer();
    }
  }



   /**
   * @param text
   * @param xCoordinate
   * @param yCoordinate
   * @param fontSize
   * @param color
   * @param alignment
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'start',
    color: string = 'black',
  ): void {
    this.ctx.font = `700 ${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
