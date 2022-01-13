export default abstract class InfoDisplay {
  protected canvas: HTMLCanvasElement;

  /**
   * Initialize an instance of this class
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'red',
    alignment: CanvasTextAlign = 'start',
  ): void {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
