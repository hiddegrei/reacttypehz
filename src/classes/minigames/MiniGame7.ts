import Room from "../Room";
import MGMain from "./MGMain";
// import Game from "../Game";

export default class MiniGame7 extends MGMain {
    private combination: number[];
    private locked: boolean;
    private wheels: number[];
    private position: number;
    private lockImage!: HTMLImageElement;
    private time: number;
    private positionKeyPressed: boolean;
    private numberKeyPressed: boolean;
    // private timeIncrement: number;
    private randomNumberPositionDX: number[];
    private randomNumberPositionDY: number[];
    private randomSize: number[];
    
    
    /**
   	* Create an instance of this object
   	* @param ctx canvas rendering context 2D
   	* @param room A room
   	* @param canvas canvas
   	*/
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      	super(7,room, ctx, canvas,[],[]);
      	this.roomId=7;
      	this.locked = true;
      	this.combination = [];
      	this.wheels = [];
      	this.position = 0;
      	this.time = 0;
      	this.positionKeyPressed = false;
      	this.numberKeyPressed = false;
      	// this.timeIncrement = 0;
      	this.randomNumberPositionDX = [];
      	this.randomNumberPositionDY = [];
      	this.randomSize = [];
      	this.started=true;
      	do {
        	this.codeGenerator();
        	this.generateStartPosition();
      	} while (this.combination === this.wheels);
      	this.combination.forEach((value:number) => {
        	this.randomNumberPositionDX.push(Room.randomNumber(10*value,(window.innerWidth/1.1)));
        	this.randomNumberPositionDY.push(Room.randomNumber(10*value,(window.innerHeight/1.1)));
        	this.randomSize.push(Room.randomNumber(15,25));
      	});
      
      	//document.onkeydown=this.checkLocks.bind(this);
    }

    /**
   	* Functie om de game te updaten
   	*/
    public update(elapsed:number){
		this.timer(elapsed)
      	if (this.locked === true) {
        	this.check();
      		if (this.started) {
        		document.onkeydown = this.checkLocks.bind(this);
        		this.started=false;
	 	    }
     
      		if (this.time >= 100) {
        		this.time = 0;
        		this.positionKeyPressed = false;
        		this.numberKeyPressed = false;
      		}
      		this.time++;
      	}
    }

	/**
   	* Functie om de minigame te renderen
   	*/
	public render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		Room.drawImageScaled(
		  	this.ctx,
		  	'./img/background/bank-room-interior-backdrop-metal-safe-door-vault-background-racks-deposit-boxes-secure-currency-storage-inside-174243488.jpg',
		  	1,
		  	1,
		  	0,
		  	35,
		);

		this.lockImage = Room.loadNewImage('./img/objects/4541104.png');
		this.ctx.drawImage(this.lockImage,-20, window.innerHeight/6);
		this.explanation();
		this.lockImage = Room.loadNewImage('./img/objects/pngwing.com (500).png');
		this.ctx.drawImage(this.lockImage,this.canvas.width / 3, -12);

		this.wheels.forEach((value: number, index: number) => {
		  	if (this.position === index) {
				this.writeTextToCanvas(
			  		`[${value}]`,
			  		50, 997 - (index * 54.5),
			  		513,
			  		'center',
			  		'green',
				);
		  	} else {
			  	this.writeTextToCanvas(
					`${value}`,
					50, 997 - (index * 54.5),
					513,
			  	);
			}
		});

		if (this.locked === false) {
			this.writeTextToCanvas("Goed gedaan!", 20, window.innerWidth/2, window.innerHeight-150);
		}

		this.hints();
	}

	/**
	 * Verantwoordelijke functie voor de functies die mechanisch iets aan het lock veranderen
	 * @param e Key pressed
	 */
    public checkLocks(e:any){
      console.log(e.keyCode);
      this.lockposition(e.keyCode);
      this.locknumber(e.keyCode);
    }

	/**
	 * Genereert een random code;
	 */
    private codeGenerator(){
      	for (let i = 0; i < Room.randomNumber(1,4); i++) {
        	this.combination.push(Room.randomNumber(0,9));
      	} 
      	console.log(this.combination);
    }

	/**
	 * genereert de startpositie van het lock (wss zoiets als [0,0,0,0]);
	 */
    private generateStartPosition(){
      	for (let i = 0; i < this.combination.length; i++) {
        	this.wheels[i] = 0;
      	}
      	console.log(this.wheels);
    }

	/**
	 * Verandert de positie waar een nummer veranderd word (dus naar links of naar rechts)
	 * @param keycode Key pressed
	 */
    private lockposition(keycode:number){
      	if (this.wheels.length !== 1) {
        	if (keycode===37 ) {
          		if(this.position === this.wheels.length - 1){
            		this.position = 0;
          		} else {
            		this.position++;
          		}
          		this.positionKeyPressed = true;
        	} else if (keycode===39 ) {
          		if(this.position === 0){
            		this.position = this.wheels.length -1;
          		} else {
            		this.position--;
          		}
          		this.positionKeyPressed = true;
        	}
      	}
    }

	/**
	 * Kijkt of een cijfer verhoogt of verlaagd moet worden
	 * @param keycode Key pressed
	 */
    private locknumber(keycode:number){
      	if (keycode===40 ) {
        	this.decrement(this.position);
        	this.numberKeyPressed = true;
      	} else if (keycode===38 ) {
        	this.increment(this.position);
        	this.numberKeyPressed = true;
      	}
    }

	/**
	 * Functie die de uitleg op het scherm weergeeft
	 */
    private explanation() {
      	this.writeTextToCanvas(`Dit is kamer `+this.roomId,20,window.innerWidth/3,window.innerHeight/1.1);
      	this.writeTextToCanvas(`Probeer de code te kraken`,20,225,300);
      	this.writeTextToCanvas(`Gebruik de pijltestoetsen (en misschien ook wat hints)`,20,225,325);
      	this.writeTextToCanvas(`Pijl omhoog = cijfer omhoog`,20,225,400);
      	this.writeTextToCanvas(`Pijl omlaag = cijfer omlaag`,20,225,450);
      	this.writeTextToCanvas(`Pijl naar links = positie naar links`,20,225,500);
      	this.writeTextToCanvas(`Pijl naar rechts = positie naar rechts`,20,225,550);
    }

	/**
	 * functie die hints op het scherm weergeeft
	 */
    private hints(){
      	this.combination.forEach((value: number, index: number) => {
        	this.writeTextToCanvas(`${value}`,this.randomSize[index],this.randomNumberPositionDX[index],this.randomNumberPositionDY[index], 'center', 'orange');
      	});
    }

	/**
	 * functie die het getal verhoogt
	 * @param wheel getal op het wheel
	 */
    private increment(wheel: number) {
      	if (this.wheels[wheel] === 9) {
        	this.wheels[wheel] = 0;
      	} else {
        	this.wheels[wheel]++;
      	}
    }

	/**
	 * functie die het getal verlaagt
	 * @param wheel getal op het wheel
	 */
    private decrement(wheel: number) {
      	if (this.wheels[wheel] === 0) {
        	this.wheels[wheel] = 9;
      	} else {
        	this.wheels[wheel]--;
      	}
    }

	/**
	 * functie zorgt dat de speler de kamer na enige tijd kan verlaten als de combinatie klopt
	 */
    public check() {
      	if (this.combinationCheck() === true) {
        	this.locked = false;
        	setTimeout(this.answer.bind(this),4000)
      	} else {
        	this.locked = true;
      	}
    }

	

	/**
	 * Checkt of de combinatie klopt
	 * @returns boolean
	 */
    private combinationCheck(): boolean {
      	let boolean = true;
      	for (let i = 0; i < this.wheels.length; i++) {
        	if (this.wheels[i].valueOf() !== this.combination[i].valueOf()) {
          		boolean = false;
        	}
      	}
      	if(boolean === true) {
        	return true;
      	} else {
        	return false;
      	}
    }
}
