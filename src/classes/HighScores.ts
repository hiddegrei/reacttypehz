export default class HighScores {
  private highscoreArray: [string, number, number, string][];

  public constructor() {
    this.highscoreArray = [];
    this.highscoreArray.push(['BugSlayer', 400, Date.now() - 1234567, "1337H4xx0r!"]);
    this.highscoreArray.push(['Jesse', 300, Date.now() - 123456, "EenHeelComplexWachtwoord!"]);
    this.highscoreArray.push(['Hidde', 200, Date.now() - 12345, "DitWachtwoordRaadJeNooit"]);
    this.highscoreArray.push(['Jos', 100, Date.now() - 1234, "qwertyuiop"]);
    this.highscoreArray.push(['Brent', 0, Date.now() - 123, "123"]);
    this.addHighscore('Jos', 400, "Test");
  }

  public addHighscore(name: string, score: number, password: string) {
    for (let index = this.highscoreArray.length - 1; index >= 0; index--) {
      if (score <= this.highscoreArray[index][1]) {
        this.highscoreArray.splice(index + 1, 0, [name, score, Date.now(), password])
        index = 0;
      } else if (index === 0) {
        this.highscoreArray.splice(0, 0, [name, score, Date.now(), password])
        index = 0;
      }
    }
  }

  public get highscores() {
    return this.highscoreArray;
  }
}
