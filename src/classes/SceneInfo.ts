import Agent from "./Agent";
import Hints from "./Hints";

export default class SceneInfo{
    private canvas:HTMLCanvasElement
    private ctx:CanvasRenderingContext2D

    constructor(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
        this.canvas=canvas;
        this.ctx=ctx

    }

    public loadAgents(widthHall:number){
        let agents=[]
        agents.push(
          new Agent(
            1.5 * widthHall,
            100 + 1.5 * widthHall,
            this.ctx,
            widthHall,
            "random",
            0,
            "yellow"
          )
        );
        agents.push(
          new Agent(
            1.5 * widthHall,
            100 + 8 *widthHall,
            this.ctx,
            widthHall,
            "random",
            0,
            "yellow"
          )
        );
        agents.push(
          new Agent(
            this.canvas.width / 2 + 3.5 * widthHall,
            300 + 2 * widthHall,
            this.ctx,
            widthHall,
            "random",
            1,
            "orange"
          )
        );
        agents.push(
          new Agent(
            this.canvas.width / 2 + 12.5 * widthHall,
            300 + 8 * widthHall,
            this.ctx,
            widthHall,
            "random",
            2,
            "yellow"
          )
        );
        agents.push(
          new Agent(
            this.canvas.width / 2 - 0.5 * widthHall,
            100 + 3 * widthHall,
            this.ctx,
            widthHall,
            "random",
            3,
            "red"
          )
        );
        // this.agentMid=
        agents.push(
          new Agent(
            this.canvas.width / 2 - 0.5 *widthHall,
            100 + 4.5 * widthHall,
            this.ctx,
            widthHall,
            "mid",
            3,
            "red"
          )
        );
    
        agents.push(
          new Agent(
            this.canvas.width / 2 + 12 * widthHall,
            100 + 6.5 * widthHall,
            this.ctx,
            widthHall,
            "search11",
            3,
            "orange"
          )
        );
        return agents
    
      }

    public renderBackgroundImages(widthHall:number,imgBank:HTMLImageElement){
        //draw tekst grote kluis midden scherm
      this.writeTextToCanvas(
        "Grote Kluis",
        30,
        this.canvas.width / 2 - 2 * widthHall,
        400,
        "start",
        "black"
      );

      //draw background central hub
      this.ctx.drawImage(
        imgBank,
        550,
        800,
        1150,
        750,
        this.canvas.width / 2 - 4 * widthHall,
        100 + 5 * widthHall,
        7 * widthHall,
        4 * widthHall
      );

    }

    public renderInfo(timeLeft:number,score:number,progressNum:number,hints:Hints){
        this.writeTextToCanvas(`time left: ${timeLeft}`, 20, 100, 40);
      this.writeTextToCanvas(
        `score: ${score}`,
        20,
        window.innerWidth - 100,
        40
      );
      //draw voortgang
      this.writeTextToCanvas(
        `voortgang: ${progressNum}%`,
        20,
        window.innerWidth - 300,
        40
      );

      //draw hints
      this.writeTextToCanvas(
        `Verzamelde hints: `,
        30,
        window.innerWidth / 6,
        window.innerHeight / 15
      );
      hints.getHint().forEach((value: string, index: number) => {
        this.writeTextToCanvas(
          `${value}`,
          25,
          (window.innerWidth / 4)+90 + index * 40,
          window.innerHeight / 15
        );
      });
    }

    /**
   * @param text
   * @param xCoordinate
   * @param yCoordinate
   * @param fontSize
   * @param color
   * @param alignment
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "start",
    color: string = "red"
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

}