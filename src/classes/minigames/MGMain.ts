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

    public fname!: string;
    public lname!: string;
    public birth!: string;
    public habitat!: string;
    public age!: number;
    public hobbys!: string;

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
      if(e.keyCode===8&&this.index>=0){
        this.found[this.index--]=null;
        //this.index--;
      }else if(e.keyCode===13){
        this.checkAttempt();
      }else if(this.index<this.found.length&&e.keyCode!=8){
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
    if(this.attempts>=1){
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
     
      if(complete){
        
          this.complete=true;
   
          //setTimeout(this.answer,2000);
          setTimeout(this.answer.bind(this), 2000);
          //this.answer();
      }else if(this.attempts===1){
        this.complete=0;
        setTimeout(this.answerWrong.bind(this), 2000);

      }
      this.attempts--;

    }else{
      
       
      this.complete=0;
      setTimeout(this.answerWrong.bind(this), 2000);
      
       //this.answer();
    }
  }

  public renderAttemptsBlock(){
    this.ctx.strokeStyle = "rgb(0,0,0)"
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(100, 150, 700, 300)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.writeTextToCanvas(`Je hebt nog ${this.attempts} pogingen om het wachtwoord te raden, na elke poging kun je zien welke`, 16, 110, 180)
    this.writeTextToCanvas("characters je goed hebt geraden", 16, 110, 200)

    this.writeTextToCanvas("Druk op ENTER  om je poging te testen.", 16, 110, 140)
    if (this.attemptsArr) {
      for (let i = 0; i < this.attemptsArr.length; i++) {
        this.writeTextToCanvas(`Poging ${i+1}: ${this.attemptsArr[i]}`, 19, 110, 230 + i * 20)
      }
    }

  }

  public renderInfoBlock(){
    this.ctx.strokeStyle = "rgb(0,0,0)"
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(840, 150, 330, 300)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()

    if(this.roomId!=100){
    this.writeTextToCanvas("Informatie die je hebt verkregen:", 20, 850, 180)
    this.writeTextToCanvas(`voornaam: ${this.fname}`, 20, 850, 210)
    this.writeTextToCanvas(`achternaam: ${this.lname}`, 20, 850, 240)
    if(this.age){
      this.writeTextToCanvas(`leeftijd: ${this.age}`, 20, 850, 270)

    }
    
    this.writeTextToCanvas(`geboorte datum: ${this.birth}`, 20, 850, 300)
    if(this.hobbys){
      this.writeTextToCanvas(`woonplaats: ${this.habitat}`, 20, 850, 330)


    }
  }
   
  }

  public renderPassBlocks(){
    this.ctx.beginPath()
    for(let i=0;i<this.secretW.length;i++){
			this.ctx.rect(100+(i*100), 500, 50, 50);

		  }
    this.ctx.closePath()
    this.ctx.stroke()

    for (let i = 1; i < 9; i++) {
      if (this.found[i - 1] != null) {
        this.writeTextToCanvas(this.found[i - 1], 40, i * 100 + 10, 540)

      } else {
        this.writeTextToCanvas("*", 40, i * 100 + 10, 550)

      }
    }

  }

  public renderStreepIndex(){
    //streep waar de index is
    this.ctx.strokeStyle = "rgb(0,255,0)";
    this.ctx.beginPath();
 if(this.index<=this.secretW.length-1&&this.index>0){
  this.ctx.rect(100+(this.index*100), 540, 50, 10);
 }else if(this.index<=0){
  this.ctx.rect(100, 540, 50, 10);

 }else{
  this.ctx.rect(100+((this.secretW.length-1)*100), 540, 50, 10);

 }
    this.ctx.closePath();
    this.ctx.stroke();

  }

  public renderComplete(){
    if (this.complete) {
      this.writeTextToCanvas("Je hebt het wachtwoord geraden! Gebruik dus nooit je eigen gegevens in je wachtwoord, je ziet hoe makkelijk het is om dan je wachtwoord te raden!", 20, 100, window.innerHeight-150)
    } else if (this.complete === 0) {
      this.writeTextToCanvas("Helaas, dit is fout", 30, 100, 900)

    }else if (this.complete === 5) {
      this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900)

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
