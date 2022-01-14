import KeyboardListener from "../KeyboardListener";
import Room from "../Room";

export default class MGMain{
    public roomId:number;
    public room:Room;
    public keyboard:KeyboardListener;
    protected ctx: CanvasRenderingContext2D;
    protected canvas: HTMLCanvasElement;

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
