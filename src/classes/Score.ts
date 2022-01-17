export default class Score {
  public scoreProperty: number;
  public static readonly POINTS_WIN_MG=100
  public static readonly POINTS_LOSS_MG=25
  public static readonly CAUGHT_AGENTS=300
  public static readonly WIN_BOSSLEVEL=500

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

  // public get score(): number {
  //   return this.score;
  // }

  public caughtAgents(){
    if(this.scoreProperty>=Score.CAUGHT_AGENTS){
      this.scoreProperty-=Score.CAUGHT_AGENTS

    }else{
      this.scoreProperty=0
    }
    

  }

  public miniGameComplete(timeLeft:number){
    this.scoreProperty+=Math.round(((Math.round(timeLeft/1000))/120)*Score.POINTS_WIN_MG)
  }

  public miniGameLossed(){
    if(this.scoreProperty>=Score.POINTS_LOSS_MG){
      this.scoreProperty-=Score.POINTS_LOSS_MG

    }else{
      this.scoreProperty=0
    }

  }

  public winBossLevel(){
    this.scoreProperty+=Score.WIN_BOSSLEVEL
  }
}
