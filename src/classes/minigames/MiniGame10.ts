import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGame10 extends MGMain{
  	private secretW:Array<string>=[];
  	private attempts:number;
  	private found:any[];
  	private index:number;
  	private complete:any;
 	private attemptsArr:Array<string>=[];
  	private foundStr:string;
  	private started:boolean;
  	private image!: HTMLImageElement;
    
  	/**
  	* Create an instance of this object
  	* @param ctx canvas rendering context 2D
  	* @param room A room
  	* @param canvas canvas
  	*/
  	constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
  		super(10,room, ctx, canvas);
  		this.secretW=["j","a","n","w","i","e","l","1"];
   		this.found=[null,null,null,null,null,null,null,null];
   		//window.addEventListener('keydown',this.checkKey,false);
   		// document.onkeydown = this.checkKey14.bind(this);
   		//document.removeEventListener("onkeydown",this.checkKey14.bind(this))
   		this.index=0;
   		this.attempts=5;
   		this.foundStr="";
   		this.started=true;
   		// this.complete=false;
   		this.image = Game.loadNewImage("./img/background/password2.jpg");
  	}

	/**
   	* Functie om de game te updaten
   	*/
	public update(elapsed:number){
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
		this.timer(elapsed)
      	if(this.started){
        	document.onkeydown = this.checkKey14.bind(this);
        	this.started=false;
      	}
		  if(this.timeLeft<=0){
			this.complete=5
			setTimeout(this.answerWrong.bind(this), 2000);
	  
			}
    }

    /**
   	* Functie om de minigame te renderen
   	*/
    public render(){
      	this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
      	this.ctx.strokeStyle = "rgb(0,0,0)";
      	this.ctx.fillStyle = "rgb(255,255,255)";
      	this.ctx.beginPath();
      	this.ctx.rect(100, 100, 680, 300);
      	this.ctx.closePath();
      	this.ctx.stroke();
      	this.ctx.fill();
      	this.writeTextToCanvas(`Je hebt nog ${this.attempts} pogingen om het wachtwoord te raden, na elke poging kun je zien welke`, 16, 110, 130);
      	this.writeTextToCanvas("characters je goed hebt geraden", 16, 110, 150);
  
      	this.writeTextToCanvas("PRESS ENTER  om je poging te testen.", 16, 110, 50);
      	if (this.attemptsArr) {
        	for (let i = 0; i < this.attemptsArr.length; i++) {
          		this.writeTextToCanvas(`Poging ${i}: ${this.attemptsArr[i]}`, 19, 110, 170 + i * 20);
        	}
      	}
  
      this.ctx.fillStyle = "rgb(255,255,255)"
      this.ctx.beginPath()
      this.ctx.rect(790, 100, 330, 300)
      this.ctx.closePath()
      this.ctx.fill()
      this.writeTextToCanvas("Informatie die je hebt verkregen:", 20, 800, 130)
      this.writeTextToCanvas("voornaam: Jan", 20, 800, 160)
      this.writeTextToCanvas("achternaam: Raas", 20, 800, 190)
      this.writeTextToCanvas("leeftijd: 69", 20, 800, 220)
      this.writeTextToCanvas("geboorte datum: 08/11/1952", 20, 800, 250)
      this.writeTextToCanvas("woonplaats: Madrid", 20, 800, 280)
	  this.writeTextToCanvas("hobbies: wielrennen", 20, 800, 310)
  
      	this.ctx.strokeStyle = "rgb(0,0,0)";
      	this.ctx.beginPath();
		  for(let i=0;i<this.secretW.length;i++){
			this.ctx.rect(100+(i*100), 500, 50, 50);

		  }
      	this.ctx.closePath();
      	this.ctx.stroke();
  
      	for (let i = 1; i < 9; i++) {
        	if (this.found[i - 1] != null) {
          		this.writeTextToCanvas(this.found[i - 1], 40, i * 100 + 10, 540);
        	} else {
          		this.writeTextToCanvas("*", 40, i * 100 + 10, 550);
        	}
      	}
  
      for (let i = 1; i < 9; i++) {
        if (this.found[i - 1] != null) {
          this.writeTextToCanvas(this.found[i - 1], 40, i * 100 + 10, 540)
  
        } else {
          this.writeTextToCanvas("*", 40, i * 100 + 10, 550)
  
        }
      }
  
      if (this.complete) {
        this.writeTextToCanvas("Je hebt het wachtwoord geraden! Gebruik dus nooit je eigen gegevens in je wachtwoord, je ziet hoe makkelijk het is om dan je wachtwoord te raden!", 20, 100, window.innerHeight-150)
      } else if (this.complete === 0) {
        this.writeTextToCanvas("Helaas, dit antwoord is fout", 30, 100, 900)
  
      }else if (this.complete === 5) {
        this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900)
  
      }

	   //timer
	   this.renderTime()
        
      
    }

	/**
	 * check if pressed key is correct
	 * @param e Key pressed
	 */
  	public checkKey14(e:any) {
      	//console.log(e.keyCode);
      	if(e.keyCode===8){
        	this.found[this.index--]=null;
        	//this.index--;
      	}else if(e.keyCode===13){
        	this.checkAttempt();
      	}else if(this.index<=7){
        	for(let i=0;i<this.found.length;i++){
          		if(this.found[i]===null){
            		this.index=i;
            		break;
          		}
        	}
        	console.log(this.found[this.index])
        	if(e.keyCode<=57){
          		this.found[this.index]=String.fromCharCode(e.keyCode);
        	}else{
          		this.found[this.index]=String.fromCharCode(e.keyCode+32);
        	}
        	this.index++;
      	}
  	}

	/**
	 * Checks the answer. If correct: return to main page, if not: the amount of attempts gets lowered
	 */
  	public checkAttempt(){
    	for(let i=0;i<this.found.length;i++){
      		this.foundStr+=this.found[i];
    	}
    	this.attemptsArr.push(this.foundStr);
    	this.foundStr="";

	    let complete=true;
    	if(this.attempts>1){
    		for(let i=0;i<this.secretW.length;i++){
      			if(this.found[i]===this.secretW[i]){
        			this.found[i]=this.secretW[i];
      			}else{
        			this.found[i]=null;
        			complete=false;
      			}
    		}
    		for(let i=0;i<this.found.length;i++){
      			if(this.found[i]===null){
        			this.index=i;
        			break;
      			}
    		}
    		this.attempts--;
    		if(complete){
      			this.complete=true;
      			//setTimeout(this.answer,2000);
      			setTimeout(this.answer.bind(this), 2000);
      			//this.answer();
    		}
  		}else{
    		this.complete=0;
    		setTimeout(this.answerWrong.bind(this), 2000);
   			//this.answer();
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
    	alignment: CanvasTextAlign = 'start',
    	color: string = 'black',
  	): void {
    	this.ctx.font = `700 ${fontSize}px sans-serif`;
    	this.ctx.fillStyle = color;
    	this.ctx.textAlign = alignment;
    	this.ctx.fillText(text, xCoordinate, yCoordinate);
  	}
}

