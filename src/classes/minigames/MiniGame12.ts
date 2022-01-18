import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGame12 extends MGMain{
  
    
  	/**
  	* Create an instance of this object
  	* @param ctx canvas rendering context 2D
  	* @param room A room
  	* @param canvas canvas
  	*/
  	constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
  		super(12,room, ctx, canvas,["1","8","3","m","i","g","a","8"],[null,null,null,null,null,null,null,null]);
  		
		  this.fname="Tigo"
		  this.lname="Miggon"
		  this.age=18
		  this.birth="18/03/2003"
		  this.habitat="Malta"
		
  	}

	/**
   	* Functie om de game te updaten
   	*/
	public update(elapsed:number){
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
		this.timer(elapsed)
      	if(this.started){
        	document.onkeydown = this.checkKey.bind(this);
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
      
		  this.renderAttemptsBlock()
		  this.renderInfoBlock()
		  this.renderPassBlocks()
		  this.renderStreepIndex()
		  this.renderComplete()

     
  
      

	   //timer
	   this.renderTime()
        
        
    }

}

