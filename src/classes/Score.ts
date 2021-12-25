import InfoDisplay from './InformationDisplay';

export default class Score extends InfoDisplay {
  private score: number;

  /**
   * score
   *
   * @param score score of the player
   * @param canvas canvas
   */
  public constructor(score: number, canvas: HTMLCanvasElement) {
    super(canvas);
    this.score = score;
  }

  /**
   * Set the score of the player
   *
   * @param scoreChange change the score of the player
   */
  public setScore(scoreChange: number): void {
    this.score += scoreChange;
  }

  /**
   * Get score
   *
   * @returns score
   */
  public getScore(): number {
    return this.score;
  }
}
