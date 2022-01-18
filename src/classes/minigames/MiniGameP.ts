import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGameP extends MGMain {
  
  	private lockedUp: number;
  	
  
	/**
	* Create an instance of this object
   	* @param ctx canvas rendering context 2D
   	* @param room A room
   	* @param canvas canvas
   	*/
  	constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
    	super(80,room, ctx, canvas);
		this.lockedUp=1
  
	      if(this.lockedUp===1){
    	  this.secretW=["k","a","r","e","l","9","3","2"];
    	  }else{
    	    this.secretW=["9","4","p","e","r","e","n","8"];

    	  }
      	this.found=[null,null,null,null,null,null,null,null];
		 

		this.loadInfo()
      
     	//this.image=Game.loadNewImage("./img/background/cell2.jpg");

  	}

	  public loadInfo(){
		if(this.lockedUp===1){
			this.fname="Karel"
			this.lname="De 2e"
			this.age=32
			this.birth="02/01/1990"
			this.habitat="De Bank"
			
	  }else{
		this.fname="Peter"
		this.lname="Peren"
		this.age=28
		this.birth="28/02/1994"
		this.habitat="De Bank"
			
	  }

	  }

  	/**
   	* Functie om de game te updaten
   	*/
  	public update(lockedUp:number,elapsed:number){
    	this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
		this.timer(elapsed)
    	if(this.started){
      		document.onkeydown = this.checkKey.bind(this);
      		this.lockedUp=lockedUp;
      		if(lockedUp===1){
          		this.secretW=["k","a","r","e","l","9","3","2"];
      		}else{
          		this.secretW=["9","4","p","e","r","e","n","8"];
      		}
			  this.loadInfo()
        
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
    	
    
    	this.writeTextToCanvas("Je bent opgesloten door de bewakers! En de bewakers hebben een wachtwoord op de deur gezet! ",16,110,90);
    	this.writeTextToCanvas("Hack het wachtwoord om vrij te komen",16,110,110);
    	
		this.renderAttemptsBlock()
		this.renderInfoBlock()
		this.renderPassBlocks()
		this.renderStreepIndex()
		
    	//this.writeTextToCanvas("Informatie van de bewaker die het wachtwoord heeft verzonnen:",20,850,130);
    	

    	

    	if(this.complete){
      		this.writeTextToCanvas("Je hebt het wachtwoord geraden! Laat je niet nog een keer pakken!",30,100,900);
    	}else if(this.complete===0){
      		this.writeTextToCanvas("nope, geef maar op",30,100,900);

    	}else if (this.complete === 5) {
			this.writeTextToCanvas("Helaas, de tijd is op, je bent afgevoerd naar de gevangenis, amateur", 30, 100, 900)
	  
		  }

		   //timer
	  this.renderTime()
      
    	
      
  	}

  	/**
   	* Checks if the keys pressed are correct
   	* @param e Key pressed
   	*/
  	public checkKey(e:any) {
      	//console.log(e.keyCode);
      	if(e.keyCode===8&&this.index>=0){
        	this.found[this.index--]=null;
        	//this.index--;
      	}else if(e.keyCode===13){
        	this.checkAttemptP();
      	}else if(this.index<=7&&e.keyCode!=8){
        	for(let i=0;i<this.found.length;i++){
          		if(this.found[i]===null){
            		this.index=i;
            		break;
          		}
        	}
       
        	if(e.keyCode<=57){
          		this.found[this.index]=String.fromCharCode(e.keyCode);
        	}else{
         		this.found[this.index]=String.fromCharCode(e.keyCode+32);
        	}
        	this.index++;
      	}
  	}

  	/**
   	* Check the attempts left for the player
   	* if the player has guessed correctly they will be released
   	*/
  	public checkAttemptP(){
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
        		setTimeout(this.answerP.bind(this), 2000);
        		//this.answer();
     
      		}
    	}else{
      		this.complete=0;
      		setTimeout(this.answerP.bind(this), 2000);
      		//this.answer();
    	}
  	}

  	/**
   	* If the answer is true the player will be released
   	*/
  	private answerP(){
      if(this.complete){
    	this.found=[null,null,null,null,null,null,null,null];
    	this.attempts=5;
    	this.foundStr="";
    	this.attemptsArr=[];
    	this.complete=null;
    	this.index=0;
    	this.room.miniGameFinished=true;
    	document.removeEventListener("onkeydown",this.checkKey.bind(this));
    	this.room.answer=true;
      }else{
        this.room.scene.howGameEnded = "outofattempts";
        this.room.scene.game.isEnd = true;

      }
  	}

  
}
