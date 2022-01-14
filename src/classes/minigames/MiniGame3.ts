import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game"
import Hints from "../Hints";

export default class MiniGame3 extends MGMain{
    public ctx:CanvasRenderingContext2D;

    private image!: HTMLImageElement;
    

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(3,room)
      this.ctx=ctx
      this.image = Game.loadNewImage("./img/background/password2.jpg")

    }


    public update(){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      if (this.keyboard.isKeyDown(65)) {
        this.room.miniGameFinished = true
        this.room.answer = true
        this.room.getHintsGame().foundHint('g');
      } else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(67)||this.keyboard.isKeyDown(68)) {
        this.room.miniGameFinished = true
        this.room.answer = false
  
      }

    }

    public render(){

      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)

      this.ctx.strokeStyle = "rgb(255,255,255)"
      this.ctx.fillStyle="rgb(255,255,255)"
      this.ctx.beginPath()
      this.ctx.rect(90, 170, (window.innerWidth / 2) + 400, 500)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.fill()
  
      this.writeTextToCanvas("Wat is het meest gebruikte wachtwoord en daarmee het zwakste wachtwoord?", 20, 100, 200)
  
      this.writeTextToCanvas("123456", 20, 100, 300)
      this.writeTextToCanvas("press a", 20, (window.innerWidth / 2) + 100, 300)
  
      this.writeTextToCanvas("abcd", 20, 100, 400)
      this.writeTextToCanvas("press b", 20, (window.innerWidth / 2) + 100, 400)
  
      this.writeTextToCanvas("perenenappels", 20, 100, 500)
      this.writeTextToCanvas("press c", 20, (window.innerWidth / 2) + 100, 500)

      this.writeTextToCanvas("hondjes", 20, 100, 600)
      this.writeTextToCanvas("press d", 20, (window.innerWidth / 2) + 100, 600)
        
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
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}