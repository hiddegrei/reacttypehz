import Game from './Game';
import Border from './Border';
import Ray from './Ray';
import Particle from './Particle';
import Level1map from './Level1map';
import Progression from './Progression';
import Score from './Score';
import EndGame from './EndGame';
import Vector from './Vector';
import KeyboardListener from './KeyboardListener';
import Camera from './Camera';
import TimeLimit from './TimeLimit';
import Agent from './Agent';


export default class Scene {
  public canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D;

  public game: Game;

  public borders: Array<Border> = [];

  public particle = <any>{};

  public mouse = <any>{};

  public level: Level1map;

  static SPACE = 300;

  private score: Score[];

  private totalScore: number;

  

  private progression: Progression;

  private count: number;

  

  public currentTrans: Vector;

  
 
  private timeArray: number[];

  private keyboard:KeyboardListener;

  private camera:Camera;

  private agents:Array<Agent>=[];

 
  private time:number;
  private timeLeft:number

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game,time:number) {
    this.timeArray = [Date.now()];
    this.canvas = canvas;
    this.canvas.width = 1920;
    this.canvas.height = 969;
    this.camera=new Camera()
    this.currentTrans = new Vector(0, 0)
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.keyboard=new KeyboardListener()
   


    
    this.game = game;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.progression = new Progression(this.canvas);
    console.log("window widht:", window.innerWidth)
    console.log("window height:", window.innerHeight)

    this.score = [];
    this.score.push(new Score(0, this.canvas));
    this.totalScore = 0;
    this.borders = [];
    this.level = new Level1map(this.canvas, this.ctx);

    for (let i = 0; i < this.level.level1.length; i++) {
      const x = this.level.level1[i][0];
      const y = this.level.level1[i][1];
      const x2 = this.level.level1[i][2];
      const y2 = this.level.level1[i][3];
      this.borders.push(new Border(x, y, x2, y2, this.ctx,"normal"));
    }

    for (let i = 0; i < this.level.agentBorders.length; i++) {
      const x = this.level.agentBorders[i][0];
      const y = this.level.agentBorders[i][1];
      const x2 = this.level.agentBorders[i][2];
      const y2 = this.level.agentBorders[i][3];
      this.borders.push(new Border(x, y, x2, y2, this.ctx,"agent"));

    }
    // this.border= new Border(300,50,300,200,this.ctx)
    // this.ray=new Ray(50,150, this.ctx)
    this.particle = new Particle(100, 100+0.5*this.level.widthHall, this.ctx);
    this.agents.push(new Agent(1.5*this.level.widthHall, 100+0.5*this.level.widthHall, this.ctx,this.level.widthHall,"random"))
    this.agents.push(new Agent((this.canvas.width/2)+3.5*this.level.widthHall, 300+2*this.level.widthHall, this.ctx,this.level.widthHall,"random"))
    this.agents.push(new Agent((this.canvas.width/2)-(0.5*this.level.widthHall), 100+3*this.level.widthHall, this.ctx,this.level.widthHall,"search"))
    this.mouse = { x: 0, y: 0 };
    
    

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)
    this.count = 0;

   

   
    this.timeLeft=time

    this.time=0

   
  }

  

  /**
   *
   */
  processInput() {

  }

  /**
   * @param e
   */
  mouseDown(e: MouseEvent) {
    // this.particle.update(window.event.clientX,window.event.clientY)
    this.mouse = this.camera.toWorld(e.clientX, e.clientY)
    //console.log(this.mouse)


  }


  

  /**
   *@param condition boolean
   */
  update(elapsed: number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    

    // this.currentTrans = { x: trans.x, y: trans.y }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    let trans = this.camera.checkScaling(this.canvas,this.particle)
    this.camera.createMatrix(trans.x, trans.y, 0, 0)
    this.ctx.translate(trans.x, trans.y)
    // this.ctx.translate(100,100)
    this.progression.writeTextToCanvas('progress: ', this.canvas.width / 10 * 6.5, 20);

    document.onmousemove = this.mouseDown.bind(this);

   
    this.count += 1;

    this.progression.writeTextToCanvas('progress: ', 850, 20);
    // this.progression.writeTextToCanvas('progress: ', 850, 20);
    //this.progression.writeTextToCanvas('progress: ', 850, 20);
    if (this.count >= 100) {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
      this.progression.setXEnd();
      if (this.count === 100) {
        this.score.forEach((element) => { this.totalScore += element.getScore(); });
      }
    } else {
      this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
    }
    this.progression.pBar(this.ctx);
    this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 20);

    if (this.keyboard.isKeyDown(82)) {
      // this.endGame = new EndGame(this.canvas);
      this.game.isEnd = true;
    }

   
    document.onmousemove = this.mouseDown.bind(this);
    this.particle.move(this.mouse.x, this.mouse.y, this.borders);
    this.count += 1;

    if (this.time > 1000) {
      this.timeLeft-=1

      this.time = 0
    } else {
      this.time += elapsed
    }

    this.particle.move(this.mouse.x, this.mouse.y, this.borders);

    
   
    // if(this.timeLeft<1){
    //   this.game.isEnd=true
    // }
    for(let i=0;i<this.agents.length;i++){
      this.agents[i].inSight(this.particle,this.ctx)
      this.agents[i].update(this.particle, this.borders);
      this.agents[i].move()

    }
   
    
   
  }

  

  

  

  /**
   *
   */
  render() {
    // this.border.show()
    this.particle.show();
    // this.writeTextToCanvas("hi",100,100)
    for (let i = 0; i < this.borders.length; i++) {
      this.borders[i].show();
    }
    this.particle.look(this.borders);

    this.writeTextToCanvas('Central hub', 20, this.canvas.width / 2, 400);

    this.writeTextToCanvas("Timelimit: "+this.timeLeft,20,this.canvas.width / 3,20)

    for(let i=0;i<this.agents.length;i++){
    this.agents[i].show(this.ctx)
    this.agents[i].look(this.borders,this.ctx)
    }

    
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
    alignment: CanvasTextAlign = 'center',
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
// # sourceMappingURL=Scene.js.map