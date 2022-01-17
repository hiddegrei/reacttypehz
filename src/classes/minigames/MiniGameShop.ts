import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";
import Particle from "../Particle";
import Border from "../Border";
import Vector from "../Vector";

export default class MiniGame0 extends MGMain {
  

    

  	/**
     * Create an instance of this object
     * @param ctx canvas rendering context 2D
     * @param room A room
     * @param canvas canvas
     */
  	constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    	super(0, room, ctx, canvas);
    	
      
  	}

  	/**
     * Functie om de minigame te updaten
     */
  	public update(mousex:number,mousey:number,elapsed:number) {
		 
  	}

   

  	/**
     * Functie om de minigame te renderen
     */
  	public render() {
          this.writeTextToCanvas("Welkom in de shop!",25,(this.canvas.width/2)-60,200)
		 
		

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
      color: string = 'white',
    ): void {
      this.ctx.font = `bold ${fontSize}px sans-serif`;
      this.ctx.fillStyle = color;
      this.ctx.textAlign = alignment;
      this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
