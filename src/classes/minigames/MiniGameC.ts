// this.writeTextToCanvas(`Dit is de Grote Kluis`,30,50,200);
// this.writeTextToCanvas(`Kraak de kluis met de verzamelde hints`,20,50,250);
// this.writeTextToCanvas(`Verzamelde hints:`,20,50,300);
// this.writeTextToCanvas(`Pogingen: ${this.attempts}`,30,50,400);
// this.writeTextToCanvas("Let op je pogingen! Druk op de spatiebalk om de kamer te verlaten",20,50,500);
// this.imgBank=Game.loadNewImage("./img/background/bankback.jpg");

import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";
import Hints from "../Hints";

export default class MiniGameC extends MGMain{
  

    
  	/**
  	* Create an instance of this object
  	* @param ctx canvas rendering context 2D
  	* @param room A room
  	* @param canvas canvas
  	*/
  	constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
  		super(14,room, ctx, canvas,room.hints.getAnswer(),room.hints.found);
		
   		this.image = Game.loadNewImage("./img/background/bankback.jpg");
  	}

	/**
   	* Functie om de game te updaten
   	*/
	public update(elapsed:number){
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      	if(this.started){
        	document.onkeydown = this.checkKey14.bind(this);
        	this.started=false;
      	}
    }

    /**
   	* Functie om de minigame te renderen
   	*/
    public render(){
      	this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight);
      
		  this.renderAttemptsBlock()
		  this.renderInfoBlock()
		//   this.renderPassBlocks()
		  //this.renderStreepIndex()
		 // this.renderComplete()

      this.writeTextToCanvas("Dit is de grote kluis", 20, 800, 130)
      this.writeTextToCanvas("Kraak de kluis met de verzamelde hints", 20, 800, 160)
      this.writeTextToCanvas("Hints: ", 20, 800, 190)
      this.room.getHintsGame().getHint().forEach((value: string, index: number) => {
        this.writeTextToCanvas(`${value}`, 20,880 + index * 30,190);
    });
  
	//rects1 met wachtwoord
      	this.ctx.strokeStyle = "rgb(0,0,0)";
      	this.ctx.beginPath();
		  for(let i=0;i<this.secretW.length;i++){
			this.ctx.rect(80+(i*80), 500, 40, 40);

		  }
      	this.ctx.closePath();
      	this.ctx.stroke();

		//rects2 met wachtwoord
		// this.ctx.strokeStyle = "rgb(0,0,0)";
		// this.ctx.beginPath();
		// for(let i=0;i<5;i++){
		//   this.ctx.rect(80+(6*80), 340+(i*80), 40, 40);

		// }
		// this.ctx.closePath();
		// this.ctx.stroke();  

         //streep waar de index is
		  this.ctx.strokeStyle = "rgb(0,255,0)";
      	this.ctx.beginPath();
		 if(this.index<=this.secretW.length-1){
			this.ctx.rect(80+(this.index*80), 540, 40, 10);
		 }else{
			this.ctx.rect(80+((this.secretW.length-1)*80), 540, 40, 10);

		 }
      	this.ctx.closePath();
      	this.ctx.stroke();


  
      	for (let i = 1; i < this.secretW.length+1; i++) {
        	if (this.found[i - 1] != null) {
          		this.writeTextToCanvas(this.found[i - 1], 35, i * 80 + 10, 540,"start","rgb(255,69,0)");
        	} else {
				this.writeTextToCanvas("*", 35, i * 80 + 10, 550,"start","rgb(255,69,0)");
			}
      	}
  
      
  
      if (this.complete) {
        this.writeTextToCanvas("Je hebt het wachtwoord van de grote kluis geraden! ", 20, 100, window.innerHeight-150);
      } else if (this.complete === 0) {
        this.writeTextToCanvas("Helaas, dit antwoord is fout", 30, 100, 900);
  
      }else if (this.complete === 5) {
        this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900)
  
      }
        
       
    }

	/**
	 * check if pressed key is correct
	 * @param e Key pressed
	 */
  	public checkKey14(e:any) {
      	//console.log(e.keyCode);
      	if(e.keyCode===8){
			  this.index--
			  
			  if(this.found[this.index]!="-"){
				this.found[this.index]=null;
			  }else{
				  this.index--
				this.found[this.index]=null;

			  }
        	
      	}else if(e.keyCode===13){
        	this.checkAttempt();
      	}else if(this.index<=this.secretW.length-1){
        	for(let i=0;i<this.found.length;i++){
          		if(this.found[i]===null){
            		this.index=i;
            		break;
          		}
        	}
        	//console.log(this.found[this.index])
        	if(e.keyCode>90||e.keyCode<65){
				if(e.shiftKey&&e.keyCode===49){
					this.found[this.index]="!"
					this.index++;
				}else if(e.keyCode===189){
					this.found[this.index]="-"
				}else if(!e.shiftKey){
					this.found[this.index]=String.fromCharCode(e.keyCode);

				}
				if(!e.shiftKey){
				this.index++;
				}
				
				

				
          		
        	}else{
				
				if(!e.shiftKey){
					this.found[this.index]=String.fromCharCode(e.keyCode+32);
				 
					this.index++;
				}
          		
				
        	}
        	
      	}
  	}

}