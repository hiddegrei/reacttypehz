import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game";

export default class MiniGame5 extends MGMain{
   
    
    /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(5,room,ctx, canvas,["b","a","s","b","a","l","8","3"],[null,null,null,null,null,null,null,null])
     

    }

 

  /**
   * Functie om de game te updaten
   */
    public update(elapsed:number){
      this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
      this.timer(elapsed)
      if(this.started){
        document.onkeydown = this.checkKey.bind(this);
        this.started=false
      }

      if(this.timeLeft<0){
        this.complete=5
        setTimeout(this.answerWrong.bind(this), 2000);
  
        }

    }

    /**
     * Functie om de minigame te renderen
     */
    public render(){
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)
    this.ctx.strokeStyle = "rgb(0,0,0)"
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(100, 100, 700, 300)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.writeTextToCanvas(`Je hebt nog ${this.attempts} pogingen om het wachtwoord te raden, na elke poging kun je zien welke`, 16, 110, 130)
    this.writeTextToCanvas("characters je goed hebt geraden", 16, 110, 150)

    this.writeTextToCanvas("Druk op ENTER  om je poging te testen.", 16, 110, 50)
    if (this.attemptsArr) {
      for (let i = 0; i < this.attemptsArr.length; i++) {
        this.writeTextToCanvas(`Poging ${i+1}: ${this.attemptsArr[i]}`, 19, 110, 170 + i * 20)
      }
    }

    this.ctx.strokeStyle = "rgb(0,0,0)"
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(840, 100, 330, 300)
    this.ctx.closePath()
    this.ctx.fill()
    this.writeTextToCanvas("Informatie die je hebt verkregen:", 20, 850, 130)
    this.writeTextToCanvas("voornaam: Bastiaan", 20, 850, 160)
    this.writeTextToCanvas("achternaam: Berg", 20, 850, 190)
    this.writeTextToCanvas("leeftijd: 18", 20, 850, 220)
    this.writeTextToCanvas("geboorte datum: 08/08/2003", 20, 850, 250)
    this.writeTextToCanvas("woonplaats: Utrecht", 20, 850, 280)
    this.writeTextToCanvas("hobbie: Basketballen", 20, 850, 310)

    this.ctx.beginPath()
    for(let i=0;i<this.secretW.length;i++){
			this.ctx.rect(100+(i*100), 500, 50, 50);

		  }
    this.ctx.closePath()
    this.ctx.stroke()

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
      this.writeTextToCanvas("Helaas, dit is fout", 30, 100, 900)

    }else if (this.complete === 5) {
      this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900)

    }

     //timer
	  this.renderTime()

        
    }

}
