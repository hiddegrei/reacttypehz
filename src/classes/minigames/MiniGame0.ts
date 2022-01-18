import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";
import Particle from "../Particle";
import Border from "../Border";
import Vector from "../Vector";

export default class MiniGame0 extends MGMain {
  	private imageBob: HTMLImageElement;
  	private imageBackground: HTMLImageElement;
    private particle:Particle

    private borders:Border[]=[]

    private color:string;
    
    private answer1:boolean

   

    

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
      this.particle=new Particle(window.innerWidth/2,window.innerHeight/2,ctx)
      this.borders.push(new Border(0, 0, this.canvas.width, 0,ctx,"normal"))
      this.borders.push(new Border(0, 0, 0, this.canvas.height,ctx,"normal"))
      this.borders.push(new Border(this.canvas.width, 0, this.canvas.width, this.canvas.height,ctx,"normal"))
      this.borders.push(new Border(0, this.canvas.height, this.canvas.width, this.canvas.height,ctx,"normal"))
      this.color="rgb(255,255,255)"
      this.answer1=false
      
  	}

  	/**
     * Functie om de minigame te updaten
     */
  	public update(mousex:number,mousey:number,elapsed:number) {
		  this.timer(elapsed)
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
    	this.particle.update(mousex,mousey,this.borders)
      this.particle.animate();
      this.particle.move();

      if(Vector.dist(this.particle.pos,{x:1250,y:300})<50){
        this.color="rgb(255,0,0)"
        this.answer1=false
      }else if(Vector.dist(this.particle.pos,{x:1250,y:400})<50){
        this.color="rgb(0,255,0)"
        this.answer1=false

      }else if(Vector.dist(this.particle.pos,{x:1250,y:500})<50){
        this.color="rgb(0,0,255)"
        this.answer1=true

      }

      if(this.keyboard.isKeyDown(13)){
        
        if(this.answer1){
          this.complete=true
          setTimeout(this.answer.bind(this), 4000);
          // this.room.answer=true
          // this.room.miniGameFinished=true
        }else{
          this.complete=0
          setTimeout(this.answerWrong.bind(this), 2000);
          

        }
      }else{
		  if(this.timeLeft<0){
			this.complete=5
			setTimeout(this.answerWrong.bind(this), 2000);

		  }
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
    	

    	this.ctx.strokeStyle = "rgb(0,0,0)";
    	this.ctx.fillStyle="rgb(255,255,255)";
    	this.ctx.beginPath();
    	this.ctx.rect(100, 200, 400, 400);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.ctx.fill();

    	this.ctx.beginPath();
    	this.ctx.rect(590, 220, 750, 350);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.ctx.fill();

    	this.ctx.drawImage(this.imageBob, 100, 200);

      this.explenation();
    	this.informationAboutBob();

      this.particle.show(true,this.color)

      if (this.complete) {
        this.writeTextToCanvas("Goed gedaan!", 20, 100, window.innerHeight-150)
      } else if (this.complete === 0) {
        this.writeTextToCanvas("Helaas, dit is fout", 30, 100, 900)
  
      }else if (this.complete === 5) {
        this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900)
  
      }
      //timer
	  this.renderTime()
  }

  	/**
	 * Write the information about BOB to the canvas
	 */
	private informationAboutBob() {
		this.writeTextToCanvas("naam: Bob", 20, 110, 355);
		this.writeTextToCanvas("leeftijd: 17", 20, 110, 400);
		this.writeTextToCanvas("geboorte datum: 01/10/2001", 20, 110, 450);
		this.writeTextToCanvas("woonplaats: Utrecht", 20, 110, 500);

		this.writeTextToCanvas("Bob17Utrecht01", 20, 600, 300);
		this.writeTextToCanvas("A", 20, 1250, 300,"start","red");
    
		this.writeTextToCanvas("ABC54@#2as", 20, 600, 400);
		this.writeTextToCanvas("B", 20, 1250, 400,"start","green");

		this.writeTextToCanvas("Laat je wachtwoord-manager een wachtwoord genereren", 20, 600, 500);
		this.writeTextToCanvas("C", 20, 1250, 500,"start","blue");
	}

  	/**
	 * Write the explenation to the canvas
	 */
	private explenation() {
		this.writeTextToCanvas("Dit is Bob, Bob heeft een account op twitter.com. ", 20, 100, 100);
		this.writeTextToCanvas("De profielnaam van Bob op Twitter is Bob12 en zijn wachtwoord is 'ABC54@#2as'. ", 20, 100, 120);
		this.writeTextToCanvas("Bob maakt een account aan op Instagram, wat is het beste wachtwoord dat hij kan kiezen?", 20, 100, 140);
		this.writeTextToCanvas("Hieronder staan de verdere gegevens van Bob", 20, 100, 160);

    this.writeTextToCanvas("Loop naar het goede antwoord en druk op enter als je het zeker weet", 20, 600, 250)
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
      this.ctx.font = `bold ${fontSize}px sans-serif`;
      this.ctx.fillStyle = color;
      this.ctx.textAlign = alignment;
      this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
