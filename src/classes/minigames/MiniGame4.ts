import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game"

export default class MiniGame4 extends MGMain{
    private secretW:Array<string>=[]
    private attempts:number
    private found:any[]
    private index:number;
    private complete:any
    private attemptsArr:Array<string>=[]
    private foundStr:string
    private started:boolean
    private image!: HTMLImageElement;
    
    /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(4,room,ctx, canvas)
      this.secretW=["3","4","2","4","m","e","s","s","i"]
      this.found=[null,null,null,null,null,null,null,null,null]
      //window.addEventListener('keydown',this.checkKey,false);
      // document.onkeydown = this.checkKey.bind(this);
      this.index=0
      this.attempts=6
      this.foundStr=""
     // this.complete=false
     this.started=true
     this.image = Game.loadNewImage("./img/background/password2.jpg")

    }

  public checkKey(e:any) {
      //console.log(e.keyCode)
      if(e.keyCode===8){
        this.found[this.index--]=null
        //this.index--
      }else if(e.keyCode===13){
        this.checkAttempt()
      }else if(this.index<=8){
        for(let i=0;i<this.found.length;i++){
          if(this.found[i]===null){
            this.index=i
            break;
          }
        }
        console.log(this.found[this.index])
        if(e.keyCode<=57){
          this.found[this.index]=String.fromCharCode(e.keyCode)
          

        }else{
          this.found[this.index]=String.fromCharCode(e.keyCode+32)
          
        }
        
        this.index++
      }

      

  }

  public checkAttempt(){
    for(let i=0;i<this.found.length;i++){
      this.foundStr+=this.found[i]
    }
    this.attemptsArr.push(this.foundStr)
    this.foundStr=""

    let complete=true
    if(this.attempts>0){
    for(let i=0;i<this.secretW.length;i++){
      if(this.found[i]===this.secretW[i]){
        this.found[i]=this.secretW[i]
      }else{
        this.found[i]=null
        complete=false
      }
    }
    for(let i=0;i<this.found.length;i++){
      if(this.found[i]===null){
        this.index=i
        break;
      }
    }
    this.attempts--
    if(complete){
      this.complete=true
     
      //setTimeout(this.answer,2000)
      setTimeout(this.answer.bind(this), 4000);
      //this.answer()
     
    }
  }else{
    this.complete=0
    setTimeout(this.answer.bind(this), 2000);
   //this.answer()
  }
  }

  public answer(){
    this.room.miniGameFinished=true
    this.room.answer=true
    this.room.getHintsGame().foundHint('o');
    

  }

  /**
   * Functie om de game te updaten
   */
    public update(){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      if(this.started){
        document.onkeydown = this.checkKey.bind(this);
        this.started=false
      }

    }

    /**
   * Functie om de minigame te renderen
   */
    public render(){
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)
    this.ctx.strokeStyle = "rgb(0,0,0)"
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(100, 100, 700, 300)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.writeTextToCanvas(`Je hebt nog ${this.attempts} pogingen om het wachtwoord te raden, na elke poging kun je zien welke`, 16, 110, 130)
    this.writeTextToCanvas("characters je goed hebt geraden", 16, 110, 150)

    this.writeTextToCanvas("Druk op ENTER  om je poging te testen.", 16, 110, 50)
    if (this.attemptsArr) {
      for (let i = 0; i < this.attemptsArr.length; i++) {
        this.writeTextToCanvas(`Poging ${i+1}: ${this.attemptsArr[i]}`, 19, 110, 170 + i * 20)
      }
    }

    this.ctx.strokeStyle = "rgb(0,0,0)"
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(840, 100, 330, 300)
    this.ctx.closePath()
    this.ctx.fill()
    this.writeTextToCanvas("Informatie die je hebt verkregen:", 20, 850, 130)
    this.writeTextToCanvas("voornaam: Lionel", 20, 850, 160)
    this.writeTextToCanvas("achternaam: Messi", 20, 850, 190)
    this.writeTextToCanvas("leeftijd: 34", 20, 850, 220)
    this.writeTextToCanvas("geboorte datum: 24/06/1987", 20, 850, 250)
    this.writeTextToCanvas("woonplaats: Parijs", 20, 850, 280)
    this.writeTextToCanvas("hobbies: voetbal", 20, 850, 310)

    this.ctx.beginPath()
    this.ctx.rect(100, 500, 50, 50)
    this.ctx.rect(200, 500, 50, 50)
    this.ctx.rect(300, 500, 50, 50)
    this.ctx.rect(400, 500, 50, 50)
    this.ctx.rect(500, 500, 50, 50)
    this.ctx.rect(600, 500, 50, 50)
    this.ctx.rect(700, 500, 50, 50)
    this.ctx.rect(800, 500, 50, 50)
    this.ctx.rect(900, 500, 50, 50)
    this.ctx.closePath()
    this.ctx.stroke()


    for (let i = 0; i < this.secretW.length; i++) {
      if (this.found[i ] != null) {
        this.writeTextToCanvas(this.found[i], 40, (i+1) * 100 + 10, 540)

      } else {
        this.writeTextToCanvas("*", 40, (i+1) * 100 + 10, 550)

      }
    }

    if (this.complete) {
      this.writeTextToCanvas("Je hebt het wachtwoord geraden! Gebruik dus nooit je eigen gegevens in je wachtwoord, je ziet wat er dan kan gebeuren!", 20, 100, window.innerHeight-150)
    } else if (this.complete === 0) {
      this.writeTextToCanvas("Helaas, dit is fout", 30, 100, 900)

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