import Game from './Game';
import GameLoop from './GameLoop';
import HighScores from './HighScores';
import InfoDisplay from './InformationDisplay';
import KeyboardListener from './KeyboardListener';
import Scene from './Scene';
import {db} from "../firebase";
import MouseListener from './MouseListener';
import Vector from './Vector';
import ScoreToDatabase from './ScoreToDatabase';

export default class EndGame extends InfoDisplay {
  

  private game: Game;

  private image!: HTMLImageElement;

  private img!: HTMLImageElement;

  private ctx: CanvasRenderingContext2D;

  private keyboard:KeyboardListener;

  private mouseListener:MouseListener

  private gameloop!: GameLoop;

  private highscores: HighScores;

  private scene:Scene;

  private image1:HTMLImageElement;
  private image2:HTMLImageElement;
  private image3:HTMLImageElement;
  private userData:any[]=[]
  private scoreToDatabase:ScoreToDatabase;
  private started:boolean
  /**
   * constructor
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement,game:Game,scene:Scene) {
    super(canvas);
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.keyboard=new KeyboardListener()
    this.game=game;
    this.highscores = new HighScores();
    this.mouseListener=new MouseListener()
    //this.highscores.highscores;
    // console.log(this.game.username);
    // this.highscores.addHighscore(this.game.username, 999, this.game.password);
    this.scene=scene
    this.image1=Game.loadNewImage("./img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png")
    this.image2=Game.loadNewImage("./img/objects/4541104.png")
    this.image3=Game.loadNewImage("./img/background/the-button-859351_960_720.png")
    this.scoreToDatabase=new ScoreToDatabase()

    
      this.started=true
      

   
  }

  private getData(){
    console.log("i get the data")
    db.collection("users").orderBy("highscore","desc").limit(10).get().then((shot)=>{
      shot.forEach((doc)=>{
        this.userData.push(doc.data())
      }) })

  }

  /**
   * update the endscreen
   */
  public update(): void {
    document.querySelectorAll('div.hud').forEach((element) => {element.remove() } )
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    if(this.keyboard.isKeyDown(32)){
      this.game.isEnd=false
    }
    if(this.started){
      this.started=false
      this.scoreToDatabase.update(this.scene.score.scoreProperty)
      setTimeout(()=> this.getData(),500)
      
        
     
    }

   
    let playagainBut={x: window.innerWidth-450,y:500}
    
    let mousePos={x:this.mouseListener.positionX,y:this.mouseListener.positionY}
    if(Vector.dist(playagainBut,mousePos)<=50&&this.mouseListener.isPrimaryButtonPressed()){
      window.location.reload()

    }
    
  }


  /**
   * Render the endscreen
   */
   public render(): void {
    let limit;
    this.ctx.drawImage(this.image1,0,0,this.image1.width,this.image1.height,0,0,window.innerWidth,window.innerHeight)
    //this.drawImageScaled(this.ctx, './img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png', 1, 1, 0, 0);
    this.draw(this.ctx, './img/objects/4541104.png', window.innerWidth / 25, window.innerHeight / 4.8);
    this.drawImageScaled(this.ctx, './img/background/the-button-859351_960_720.png', 0.34, 0.3,  window.innerWidth / 30, -80);
    this.writeTextToCanvas('Kraak de kluis',  230, 80, 70, 'black');
    this.writeTextToCanvas('HighScores',  250, 340, 25, 'black');
    // this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 2.6);
    // this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 1.45);
    if (this.highscores.highscores.length > 10) {
      limit = 10;
    } else {
      limit = this.highscores.highscores.length;
    }
    // for (let index = 0; index < limit ; index++) {
    //   this.writeTextToCanvas(`#${index + 1} - ${this.highscores.highscores[index][0]} - ${this.highscores.highscores[index][1]} Punten`, this.canvas.width / 5.85, ((this.canvas.height / 2.6) + (((this.canvas.height / 1.4) - (this.canvas.height / 2.6)) / 10) * index));
    // }

    this.userData.forEach((doc,index)=>{
      this.writeTextToCanvas(`#${index+1} ${doc.username}: ${doc.highscore} punten`,220,380+(30*index))
    })

    this.ctx.strokeStyle = "rgb(255,0,0)"
    this.ctx.fillStyle="rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(window.innerWidth-500, 280, 470, 100)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    if(this.scene.howGameEnded==="caught"){
      this.writeTextToCanvas("Je bent gepakt door de politie!",window.innerWidth-450,300)
    }else if(this.scene.howGameEnded==="gekraakt"){
      this.writeTextToCanvas("Je hebt de bank gekraakt, gefeliciteerd!",window.innerWidth-450,300)
    }else if(this.scene.howGameEnded==="outofattempts"){
      this.writeTextToCanvas("Je poging om de bank te kraken duurde te lang,",window.innerWidth-450,300)
      this.writeTextToCanvas("je bent gepakt door de politie",window.innerWidth-450,320)
    }else{
      this.writeTextToCanvas("Je bent gepakt door de politie!",window.innerWidth-450,300)

    }
   

    this.ctx.strokeStyle = "rgb(255,0,0)"
    this.ctx.fillStyle="rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(window.innerWidth-500, 100, 200, 60)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.writeTextToCanvas(`Jouw score: ${this.scene.score.scoreProperty}`,window.innerWidth-490,120,14)


    this.ctx.strokeStyle = "rgb(255,0,0)"
    this.ctx.fillStyle="rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(window.innerWidth-500, 480, 150, 40)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()

    this.writeTextToCanvas("play again",window.innerWidth-490, 500)
  }

  private draw(ctx:CanvasRenderingContext2D, image: string, xPos: number, yPos: number): void {
    this.image = Game.loadNewImage(image);
    ctx.drawImage(this.image, xPos, yPos);
    // this.gameloop.stop;
  }

  private drawImageScaled(ctx: CanvasRenderingContext2D,
    img: string,
    imgWidth: number,
    imgHeight: number,
    xPos: number,
    yPos: number) {
    this.img = Game.loadNewImage(img);
    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width / imgWidth,
      this.img.height / imgHeight,
      xPos,
      yPos,
      window.innerWidth,
      window.innerHeight,
    );
  }
}
