import InfoDisplay from './InformationDisplay';

export default class Progression extends InfoDisplay {
  private static readonly BEGINXCOORDINATE = 1000;

  private time: number;

  private progression: number;

  private xStart: number;

  private xEnd: number;

  private yStart: number;

  private yEnd: number;

  /**
   * initialize an instance of this object
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.canvas = canvas;
    this.writeTextToCanvas('progress: ', this.canvas.width / 10 * 5, 20);
    this.xStart = this.canvas.width / 10 * 7;
    this.xEnd = this.canvas.width / 10 * 8;
    this.yStart = 15;
    this.yEnd = 15;
    this.progression = 100;
    this.writeTextToCanvas(`${this.progression}%`, this.canvas.width / 10 * 9, 20);
    this.time=0
  }

  /**
   * progressbar rendering
   *
   * @param ctx ctx
   */
  public pBar(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = '#800080';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(this.xStart, this.yStart);
    ctx.lineTo(this.xEnd, this.yEnd);
    ctx.stroke();
  }

  /**
   * set the progressbar
   */
  public setXEnd(): void {
    this.xEnd = this.canvas.width / 10 * 8 + this.progression;
  }

  /**
   * Get progression
   *
   * @returns progression
   */
  public getProgression(): number {
    return this.progression;
  }

  /**
   * Get the time
   *
   * @returns the time
   */
  public getTime(): number {
    return this.time;
  }
}
