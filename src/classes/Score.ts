export default class Score {
  private scoreProperty: number;

  /**
   * score
   *
   * @param score score of the player
   * @param canvas canvas
   */
  public constructor(score: number) {
    this.scoreProperty = score;
  }

  public set score(dScore: number) {
    this.scoreProperty += dScore;
  }

  public get score(): number {
    return this.score;
  }
}
