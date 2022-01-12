import Game from './Game';
import GameLoop from './GameLoop';
import HighScores from './HighScores';
import InfoDisplay from './InformationDisplay';
import KeyboardListener from './KeyboardListener';
import Scene from './Scene';

export default class EndGame extends InfoDisplay {
  

  private game: Game;

  private image!: HTMLImageElement;

  private img!: HTMLImageElement;

  private ctx: CanvasRenderingContext2D;

  private keyboard:KeyboardListener;

  private gameloop!: GameLoop;

  private highscores: HighScores;

  private scene:Scene;

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
    //this.highscores.highscores;
    // console.log(this.game.username);
    // this.highscores.addHighscore(this.game.username, 999, this.game.password);
    this.scene=scene
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
    
  }


  /**
   * Render the endscreen
   */
   public render(): void {
    let limit;
    this.drawImageScaled(this.ctx, './img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png', 1, 1, 0, 0);
    this.draw(this.ctx, './img/objects/4541104.png', this.canvas.width / 25, this.canvas.height / 4.8);
    this.drawImageScaled(this.ctx, './img/background/the-button-859351_960_720.png', 0.34, 0.3, this.canvas.width / 30, -80);
    this.writeTextToCanvas('Kraak de kluis', this.canvas.width / 6, this.canvas.height / 15, 70, 'black');
    this.writeTextToCanvas('HighScores', this.canvas.width / 6, this.canvas.height / 2.9, 25, 'black');
    // this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 2.6);
    // this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 1.45);
    if (this.highscores.highscores.length > 10) {
      limit = 10;
    } else {
      limit = this.highscores.highscores.length;
    }
    for (let index = 0; index < limit ; index++) {
      this.writeTextToCanvas(`#${index + 1} - ${this.highscores.highscores[index][0]} - ${this.highscores.highscores[index][1]} Punten`, this.canvas.width / 5.85, ((this.canvas.height / 2.6) + (((this.canvas.height / 1.4) - (this.canvas.height / 2.6)) / 10) * index));
    }

    this.ctx.strokeStyle = "rgb(255,0,0)"
    this.ctx.fillStyle="rgb(255,255,255)"
    this.ctx.beginPath()
    this.ctx.rect(window.innerWidth-500, 280, 470, 100)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    if(this.scene.howGameEnded==="caught"){
      this.writeTextToCanvas("Je bent gepakt door de politie!",window.innerWidth-250,300)
    }
    if(this.scene.howGameEnded==="gekraakt"){
      this.writeTextToCanvas("Je hebt de bank gekraakt, gefeliciteerd!",window.innerWidth-250,300)
    }
    if(this.scene.howGameEnded==="outofattempts"){
      this.writeTextToCanvas("Je poging om de bank te kraken duurde te lang,",window.innerWidth-250,300)
      this.writeTextToCanvas("je bent gepakt door de politie",window.innerWidth-250,320)
    }
   
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
