import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGameP extends MGMain {
  
  	private lockedUp!: number;
  	
  
	/**
	* Create an instance of this object
   	* @param ctx canvas rendering context 2D
   	* @param room A room
   	* @param canvas canvas
   	*/
  	constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
    	super(80,room, ctx, canvas);
  
	      if(this.lockedUp===1){
    	  this.secretW=["k","a","r","e","l","9","3","2"];
    	  }else{
    	    this.secretW=["9","4","p","e","r","e","n","8"];

    	  }
      	this.found=[null,null,null,null,null,null,null,null];
      
     	this.image=Game.loadNewImage("./img/background/cell2.jpg");

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
    	this.ctx.strokeStyle="rgb(0,255,0)";
    	this.ctx.beginPath();
    	this.ctx.rect(100,100,600,300);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.writeTextToCanvas(`Je hebt nog ${this.attempts} pogingen om het wachtwoord te raden, na elke poging kun je zien welke`,16,110,130);
    	this.writeTextToCanvas("characters je goed hebt geraden",16,110,150);

    	this.writeTextToCanvas("Druk op ENTER  om je poging te testen.",16,110,50);
    	this.writeTextToCanvas("Je bent opgesloten door de bewakers! En de bewakers hebben een wachtwoord op de deur gezet! ",16,110,70);
    	this.writeTextToCanvas("Hack het wachtwoord om vrij te komen",16,110,90);
    	if(this.attemptsArr){
      		for(let i=0;i<this.attemptsArr.length;i++){
        		this.writeTextToCanvas(`Poging ${i+1}: ${this.attemptsArr[i]}`,19,110,170+i*20);
      		}
    	}

    	this.ctx.beginPath();
    	this.ctx.rect(700,100,300,500);
    	this.ctx.closePath();
    	this.writeTextToCanvas("Informatie van de bewaker die het wachtwoord heeft verzonnen:",20,750,100);
    	if(this.lockedUp===1){
      		this.writeTextToCanvas("voornaam: Karel",20,750,130);
      		this.writeTextToCanvas("achternaam: De 2e",20,750,160);
      		this.writeTextToCanvas("leeftijd: 32",20,750,190);
      		this.writeTextToCanvas("geboorte datum: 02/01/1990",20,750,220);
      		this.writeTextToCanvas("woonplaats: De Bank",20,750,250);
    	}else{
      		this.writeTextToCanvas("voornaam: Peter",20,750,130);
      		this.writeTextToCanvas("achternaam: Peren",20,750,160);
      		this.writeTextToCanvas("leeftijd: 28",20,750,190);
      		this.writeTextToCanvas("geboorte datum: 28/02/1994",20,750,220);
      		this.writeTextToCanvas("woonplaats: De Bank",20,750,250);
    	}

    	//rect met wachtwoord
		this.ctx.strokeStyle = "rgb(0,0,0)";
		this.ctx.beginPath();
		for(let i=0;i<this.secretW.length;i++){
		  this.ctx.rect(100+(i*100), 500, 50, 50);

		}
		this.ctx.closePath();
		this.ctx.stroke();

		//streep waar de index is
		this.ctx.strokeStyle = "rgb(0,255,0)";
		this.ctx.beginPath();
	   if(this.index<=this.secretW.length-1){
		  this.ctx.rect(100+(this.index*100), 540, 50, 10);
	   }else{
		  this.ctx.rect(100+((this.secretW.length-1)*100), 540, 50, 10);

	   }
		this.ctx.closePath();
		this.ctx.stroke();


    	for(let i=1;i<9;i++){
      		if(this.found[i-1]!=null){
        		this.writeTextToCanvas(this.found[i-1],40,i*100+10,540);
      		}else{
        		this.writeTextToCanvas("*",40,i*100+10,550);

      		}

    	}

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
      	if(e.keyCode===8){
        	this.found[this.index--]=null;
        	//this.index--;
      	}else if(e.keyCode===13){
        	this.checkAttemptP();
      	}else if(this.index<=7){
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
