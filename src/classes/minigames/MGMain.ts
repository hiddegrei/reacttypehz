import KeyboardListener from "../KeyboardListener";
import Room from "../Room";

export default class MGMain{
    public roomId:number;
    public room:Room;
    public keyboard:KeyboardListener;
    protected ctx: CanvasRenderingContext2D;
    protected canvas: HTMLCanvasElement;
    private bezig:boolean

    /**
     * Create an instance of this object
     * @param roomId number of the room the player is in
     * @param ctx canvas rendering context 2D
     * @param room A room
     * @param canvas canvas
     */
    constructor(roomId:number,room:Room, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
        this.roomId=roomId;
        this.room=room;
        this.keyboard=new KeyboardListener();
        this.ctx = ctx;
        this.canvas = canvas;
        this.bezig=true
    }

    /**
	 * Functie die bepaalt wat er gebeurt als het antwoord goed is
	 */
     public answer(){
         if(this.bezig){
             this.bezig=false
        this.room.answer = true;
        this.room.miniGameFinished = true;
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

    /**
     * @param text
     * @param xCoordinate
     * @param yCoordinate
     * @param fontSize
     * @param color
     * @param alignment
     */
  	protected writeTextToCanvas(
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
