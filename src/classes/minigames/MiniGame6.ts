import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGame6 extends MGMain{
    private fullFingerprint: HTMLImageElement[];
    private partFingerprint: HTMLImageElement[];
    private randomNumber: number;
    private titelText: string;
    private color: string;
    private size: number;
    
    /**
   	* Create an instance of this object
   	* @param ctx canvas rendering context 2D
   	* @param room A room
   	* @param canvas canvas
   	*/
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      	super(6,room, ctx, canvas,[],[]);
      	this.fullFingerprint = [Game.loadNewImage('./img/fingerPrints/resized-fingerprint-1382652_1920.jpg'),Game.loadNewImage('./img/fingerPrints/resized-detective-fingerprints-print.png'),Game.loadNewImage('./img/fingerPrints/resized-istockphoto-534450004-612x612.jpg')];
      	this.partFingerprint = [Game.loadNewImage('./img/fingerPrints/detective-fingerprints-arch.png'),Game.loadNewImage('./img/fingerPrints/detective-fingerprints-loop.png'),Game.loadNewImage('./img/fingerPrints/detective-fingerprints-whorl.png')];
      	this.randomNumber = Room.randomNumber(0,2);
      	this.started = true;
      	this.titelText = 'Vergelijk de vingerafdruk met de kleinere en kies welke het meest overeenkomt';
      	this.color = 'red';
      	this.size = 20;
    }

    /**
   	* Functie om de game te updaten
   	*/
    public update(elapsed:number){
      	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		  this.timer(elapsed)
      	if(this.started){
        	document.onkeydown = this.checkLocks.bind(this);
        	this.started=false;
      	}

		 
    }

    /**
   	* Functie om de minigame te renderen
   	*/
    public render(){
     	// this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
    
    	this.writeTextToCanvas(`Dit is kamer ` + this.roomId, 20, 200, 200);
    	this.writeTextToCanvas(this.titelText, this.size, window.innerWidth / 2, window.innerHeight / 8, 'center', this.color);
    	this.loadFingerPrints();
    	this.writeTextToCanvas(`Pijltjestoets naar links <`, 20, window.innerWidth / 1.7, window.innerHeight / 4 * (0 + 1.2));
    	this.writeTextToCanvas(`Pijltjestoets omhoog ^`, 20, window.innerWidth / 1.7, window.innerHeight / 4 * (1 + 1.2));
    	this.writeTextToCanvas(`Pijltjestoets naar rechts >`, 20, window.innerWidth / 1.7, window.innerHeight / 4 * (2 + 1.2));
    }

	/**
	 * *******************************************
	 * TO-DO check of deze functie niet useless is
	 * *******************************************
	 *  
	 * Check de locks
	 * @param e Key pressed
	 */
    public checkLocks(e:any){
      	this.checkKeyboard(e.keyCode);
    }

	/**
	 * Laad alle afbeeldingen in het scherm
	 */
    private loadFingerPrints() {
      	this.ctx.drawImage(this.fullFingerprint[this.randomNumber], window.innerWidth / 3, window.innerHeight/3);
      	this.partFingerprint.forEach((value: HTMLImageElement, index: number) => this.ctx.drawImage(value, window.innerWidth / 1.5, window.innerHeight / 4 * (index + 1)));
    }

	/**
	 * Check of de key pressed klopt
	 * @param keycode Key pressed
	 */
    private checkKeyboard(keycode: number){
      	if (keycode===37 && this.randomNumber===2) {
        	this.titelText = 'Goed geantwoord';
        	this.color = 'green';
        	this.size = 30;
        	setTimeout(this.answer.bind(this),3000);
      	} else if (keycode===38 && this.randomNumber === 1) {
        	this.titelText = 'Goed geantwoord';
        	this.color = 'green';
        	this.size = 30;
        	setTimeout(this.answer.bind(this),3000);
      	} else if (keycode===39 && this.randomNumber === 0) {
        	this.titelText = 'Goed geantwoord';
        	this.color = 'green';
        	this.size = 30;
        	setTimeout(this.answer.bind(this),3000);
      	} else {
        	this.titelText = 'Fout geantwoord';
        	this.color = 'red';
        	this.size = 30;
        	setTimeout(this.answerWrong.bind(this),3000);
      	}
    }

	

    
}
