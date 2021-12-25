import Game from './Game';
import GameLoop from './GameLoop';
import InfoDisplay from './InformationDisplay';
import KeyboardListener from './KeyboardListener';
import Scene from './Scene';

export default class EndGame extends InfoDisplay {
  //private scene: Scene;

  private game: Game;

  private image!: HTMLImageElement;

  private img!: HTMLImageElement;

  private ctx: CanvasRenderingContext2D;

  private keyboard:KeyboardListener;

  private gameloop!: GameLoop;

  /**
   * constructor
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement,game:Game) {
    super(canvas);
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.keyboard=new KeyboardListener()
    this.game=game;
    
    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * update the endscreen
   */
  public update(): void {
    //console.log(document.querySelectorAll('div.hud'));
    // document.querySelectorAll('div.hud').forEach((element) => {element.innerHTML = '' } )
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
    this.drawImageScaled(this.ctx, './assets/img/background/product_image_bank-heist-4d_175f1d92e0631561ada7c2b1e91a2bde84ef47c112abba5b443d0f36fab4a134_opti.png', 1, 1, 0, 0);
    this.draw(this.ctx, './assets/img/objects/4541104.png', this.canvas.width / 25, this.canvas.height / 4.8);
    this.drawImageScaled(this.ctx, './assets/img/background/the-button-859351_960_720.png', 0.34, 0.3, this.canvas.width / 30, -80);
    this.writeTextToCanvas('Kraak de kluis', this.canvas.width / 6, this.canvas.height / 15, 70, 'black');
    this.writeTextToCanvas('HighScore List', this.canvas.width / 6, this.canvas.height / 2.9, 25, 'black');
    this.writeTextToCanvas('1#   BugSlayer - 300 points', this.canvas.width / 6, this.canvas.height / 2.6);
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
