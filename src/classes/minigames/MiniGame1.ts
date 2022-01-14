import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";


export default class MiniGame1 extends MGMain {
  	private image: HTMLImageElement;


  	/**
     * Create an instance of this object
     * @param ctx canvas rendering context 2D
     * @param room A room
     * @param canvas canvas
     */
  	constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    	super(1, room, ctx, canvas);

    	this.image = Game.loadNewImage("./img/background/password2.jpg");
  	}

  	/**
     * Functie om de minigame te updaten
     */
  	public update() {
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
    	if (this.keyboard.isKeyDown(65)) {
      		this.room.miniGameFinished = true;
      		this.room.answer = true;
      		this.room.getHintsGame().foundHint('g');
    	} else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(67)) {
      		this.room.miniGameFinished = true;
      		this.room.answer = false;
    	}
  	}

  	///////////////////////////////////////////////////////////////////////////

    //TODO
      	// ik weet niet waarom deze update methode hieronder uit gecomment staat
      	// dus laat ik hm ook maar even staan

  	///////////////////////////////////////////////////////////////////////////

  	// public update() {
  	//   this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
  	//   if (this.keyboard.isKeyDown(65)) {
  	//     this.room.miniGameFinished = true
  	//     this.room.answer = true
  	//   } else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(67)) {
  	//     this.room.miniGameFinished = true
  	//     this.room.answer = false

  	//   }

  	// }

  	//////////////////////////////////////////////////////////////////////////////

      	//einde
      
  	//////////////////////////////////////////////////////////////////////////////

  	/**
     * Functie om de minigame te renderen
     */
  	public render() {
    	this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)

    	this.ctx.strokeStyle = "rgb(255,255,255)"
    	this.ctx.fillStyle="rgb(255,255,255)"
    	this.ctx.beginPath()
    	this.ctx.rect(90, 170, (window.innerWidth / 2) + 400, 400)
    	this.ctx.closePath()
    	this.ctx.stroke()
    	this.ctx.fill()

    	this.explenation();
  	}

	/**
	 * Function to write the explenation of this minigame to the canvas
	 */
	private explenation() {
		this.writeTextToCanvas(`Dit is kamer ` + this.roomId, 20, 100, 50);
		this.writeTextToCanvas("Wat is juist?", 20, 100, 200);
		this.writeTextToCanvas("Gebruik een wachtwoord-manager en 2-staps verificatie", 20, 100, 300);
		this.writeTextToCanvas("press a", 20, (window.innerWidth / 2) + 100, 300);
		this.writeTextToCanvas("Gebruik het zelfde wachtwoord voor elke website", 20, 100, 400);
		this.writeTextToCanvas("press b", 20, (window.innerWidth / 2) + 100, 400);
		this.writeTextToCanvas("Gebruik een ander wachtwoord voor elke website en sla je wachtwoorden op in kladblok op je telefoon", 20, 100, 500);
		this.writeTextToCanvas("press c", 20, (window.innerWidth / 2) + 100, 500);
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
    	color: string = 'red',
    	alignment: CanvasTextAlign = 'center',
  	): void {
    	this.ctx.font = `${fontSize}px sans-serif`;
    	this.ctx.fillStyle = color;
    	this.ctx.textAlign = alignment
    	this.ctx.textAlign = "start";
    	this.ctx.fillText(text, xCoordinate, yCoordinate);
  	}
}
