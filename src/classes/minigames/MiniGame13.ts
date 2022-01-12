import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game"

export default class MiniGame13 extends MGMain{
    public ctx:CanvasRenderingContext2D;
    

    constructor(ctx:CanvasRenderingContext2D,room:Room){
      super(13,room)
      this.ctx=ctx

    }


    public update(){

    }

    public render(){

        this.writeTextToCanvas(`Dit is kamer `+this.roomId,20,200,200)
        
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
    alignment: CanvasTextAlign = 'center',
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}