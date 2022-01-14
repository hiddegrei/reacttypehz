import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGame0 extends MGMain {
  	private imageBob: HTMLImageElement;
  	private imageBackground: HTMLImageElement;

  	/**
     * Create an instance of this object
     * @param ctx canvas rendering context 2D
     * @param room A room
     * @param canvas canvas
     */
  	constructor(ctx: CanvasRenderingContext2D, room: Room, canvas: HTMLCanvasElement) {
    	super(0, room, ctx, canvas);
    	this.imageBob = Game.loadNewImage("./img/players/bob.png");
    	this.imageBackground = Game.loadNewImage("./img/background/password2.jpg");
  	}

  	/**
     * Functie om de minigame te updaten
     */
  	public update() {
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
    	if (this.keyboard.isKeyDown(67)) {
      		this.room.miniGameFinished = true;
      		this.room.answer = true;
      		this.room.getHintsGame().foundHint('b');
      		this.room.getHintsGame().foundHint('!');
    	} else if (this.keyboard.isKeyDown(66) || this.keyboard.isKeyDown(65)) {
      		this.room.miniGameFinished = true;
      		this.room.answer = false;
    	}
  	}

  	/**
     * Functie om de minigame te renderen
     */
  	public render() {
    	this.ctx.drawImage(this.imageBackground, 0, 0, this.imageBackground.width, this.imageBackground.height, 0, 0, window.innerWidth, window.innerHeight);
    	this.ctx.strokeStyle = "rgb(0,0,0)";
    	this.ctx.fillStyle="rgb(255,255,255)";
    	this.ctx.beginPath();
    	this.ctx.rect(80, 80, window.innerWidth-200, 90);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.ctx.fill();
    	this.explenation();

    	this.ctx.strokeStyle = "rgb(0,0,0)";
    	this.ctx.fillStyle="rgb(255,255,255)";
    	this.ctx.beginPath();
    	this.ctx.rect(100, 200, 400, 400);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.ctx.fill();

    	this.ctx.beginPath();
    	this.ctx.rect(590, 180, 750, 150);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.ctx.fill();

    	this.ctx.drawImage(this.imageBob, 100, 200);

    	this.informationAboutBob();
  }

  	/**
	 * Write the information about BOB to the canvas
	 */
	private informationAboutBob() {
		this.writeTextToCanvas("naam: Bob", 20, 110, 355);
		this.writeTextToCanvas("leeftijd: 17", 20, 110, 400);
		this.writeTextToCanvas("geboorte datum: 01/10/2001", 20, 110, 450);
		this.writeTextToCanvas("woonplaats: Utrecht", 20, 110, 500);

		this.writeTextToCanvas("Bob17Utrecht01", 20, 600, 210);
		this.writeTextToCanvas("press a", 20, 1250, 210);
		this.writeTextToCanvas("ABC54@#2as", 20, 600, 260);
		this.writeTextToCanvas("press b", 20, 1250, 260);
		this.writeTextToCanvas("Laat je wachtwoord-manager een wachtwoord genereren", 20, 600, 310);
		this.writeTextToCanvas("press c", 20, 1250, 310);
	}

  	/**
	 * Write the explenation to the canvas
	 */
	private explenation() {
		this.writeTextToCanvas("Dit is Bob, Bob heeft een account op twitter.com. ", 20, 100, 100);
		this.writeTextToCanvas("De profielnaam van Bob op Twitter is Bob12 en zijn wachtwoord is 'ABC54@#2as'. ", 20, 100, 120);
		this.writeTextToCanvas("Bob maakt een account aan op Instagram, wat is het beste wachtwoord dat hij kan kiezen?", 20, 100, 140);
		this.writeTextToCanvas("Hieronder staan de verdere gegevens van Bob", 20, 100, 160);
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
    	fontSize: number = 40,
    	xCoordinate: number,
    	yCoordinate: number,
    	alignment: CanvasTextAlign = 'start',
    	color: string = 'black',
  	): void {
    	this.ctx.font = `1000 ${fontSize}px sans-serif`;
    	this.ctx.fillStyle = color;
    	this.ctx.textAlign = alignment;
    	this.ctx.fillText(text, xCoordinate, yCoordinate);
    	this.ctx.strokeText(text, xCoordinate, yCoordinate);
    	this.ctx.strokeStyle = 'white';
  	}
}
