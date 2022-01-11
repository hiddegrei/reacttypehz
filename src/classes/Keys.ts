export default class Keys{

    public keys:Array<boolean>=[]
    public ctx:CanvasRenderingContext2D

    public inPossesion:Array<boolean>=[]

    constructor(ctx:CanvasRenderingContext2D){
        this.ctx=ctx
        for(let i=0;i<15;i++){
            this.keys[i]=false
            this.inPossesion[i]=false;
        }

    }

    public show(ctx:CanvasRenderingContext2D){
        let index=2
        for(let i=0;i<this.keys.length;i++){
          if(this.keys[i]){
           
            index++
          }
        }
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.rect(window.innerWidth/2-20,40,100,index*30);
        ctx.stroke();
        ctx.closePath()
        ctx.fill()
        let index2=2
       
        
        for(let i=0;i<this.keys.length;i++){
          if(this.keys[i]){
            this.writeTextToCanvas(`key: ${i}`,15,window.innerWidth/2,index2*30)
            index2++
           
          }
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
    alignment: CanvasTextAlign = 'center',
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

}