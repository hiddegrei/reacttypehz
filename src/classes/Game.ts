import EndGame from './EndGame';
import GameLoop from './GameLoop';

import Scene from './Scene';



export default class Game {
  public canvas: HTMLCanvasElement;

  public gameLoop: GameLoop;

  public scene: Scene;

  private endGame:EndGame;

  public isEnd:boolean;

  

  public timeLimit: number;

  /**
   * @param canvas
   */
  constructor(canvas: HTMLElement|null,time:number) {
    this.canvas = canvas as HTMLCanvasElement;
    this.scene = new Scene(this.canvas, this,time);
    this.gameLoop = new GameLoop(this);
    this.endGame=new EndGame(this.canvas,this)
   
    this.timeLimit = time;
    this.isEnd=false
  }

  /**
   *
   */
  public start() {
    // console.log('starting');
    // console.log(`Time limit: ${this.timeLimit.timeLimit}`);
    this.gameLoop.start();
  }

  /**
   *
   */
  public processInput() {
    this.scene.processInput();
  }

  /**
   * @param elapsed
   */
  public update(elapsed: number) {
    if (this.isEnd) {
      this.endGame.update();
    } else {
      this.scene.update(elapsed);
    }
    // this.scene.update()

    return false;
  }

  /**
   *
   */
  public render() {
    if (this.isEnd) {
      this.endGame.render();
    } else {
      this.scene.render();
    }
    // this.scene.render();
  }

  /**
   * @param source
   */
  static loadNewImage(source: string) {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * @param min
   * @param max
   */
  static randomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
// # sourceMappingURL=Game.js.map
