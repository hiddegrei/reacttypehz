import Game from './Game';
import Border from './Border';
import Ray from './Ray';
import Particle from './Particle';
import Level1map from './Level1map';
import Score from './Score';
import EndGame from './EndGame';
import Vector from './Vector';
import KeyboardListener from './KeyboardListener';
import Camera from './Camera';
import TimeLimit from './TimeLimit';
import Agent from './Agent';
import Progress from './Progress';
import Room from './Room';
import Keys from './Keys';
import ScoreToDatabase from './ScoreToDatabase';


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

  public totalScore: number;

  public widthHall!: number;

  private count: number;

  private endGame!: EndGame;

  private condition!: number;

  public currentTrans: Vector;

  private room:Room;

  private scoreToDatabase:ScoreToDatabase

  
 
  private timeArray: number[];

  private keyboard:KeyboardListener;

  private camera:Camera;

  private agents:Array<Agent>=[];

  private timeLimit!: TimeLimit;
  private time: number;
  private timeLeft!: number;
  private progress: Progress;

  private roomsIds:Array<any>=[]
  public insideRoom:boolean;
  private inRoomNum:number;

  public keys:Keys;

  public timeHacking:number;

  private showKeys:boolean;


  


  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game,time:number) {
    this.timeArray = [Date.now()];
    this.canvas = canvas;
    this.time=0
    this.canvas.width = 1920;
    this.canvas.height = 969;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.camera=new Camera()
    this.currentTrans = new Vector(0, 0)
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.keyboard=new KeyboardListener()
    this.insideRoom=false;
    this.inRoomNum=-1;
    this.keys=new Keys(this.ctx)
   this.timeHacking=0;
   this.showKeys=false
   this.scoreToDatabase=new ScoreToDatabase()
   
   
   
   


    
    this.game = game;
   
    this.progress = new Progress();
    this.room=new Room(0,this.ctx,this,this.canvas)
    console.log("window widht:", window.innerWidth)
    console.log("window height:", window.innerHeight)

    this.score = [];
    this.score.push(new Score(0));
    this.totalScore = 0;
    this.borders = [];
    this.level = new Level1map(this.canvas, this.ctx);
    this.roomsIds=this.level.rooms

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
    this.agents.push(new Agent(1.5*this.level.widthHall, 100+0.5*this.level.widthHall, this.ctx,this.level.widthHall,"random",0,"yellow"))
    this.agents.push(new Agent((this.canvas.width/2)+3.5*this.level.widthHall, 300+2*this.level.widthHall, this.ctx,this.level.widthHall,"random",1,"orange"))
    this.agents.push(new Agent((this.canvas.width/2)+12.5*this.level.widthHall, 300+8*this.level.widthHall, this.ctx,this.level.widthHall,"random",2,"yellow"))
    this.agents.push(new Agent((this.canvas.width/2)-(0.5*this.level.widthHall), 100+3*this.level.widthHall, this.ctx,this.level.widthHall,"search",3,"red"))
    this.keys.inPossesion[0]=true
    this.keys.inPossesion[1]=true
    this.keys.inPossesion[2]=true
    this.keys.inPossesion[3]=true
    this.mouse = { x: 0, y: 0 };
    
    

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)
    this.count = 0;

    this.timeLeft = Math.round(time/1000)
    //this.timeLeft = this.timeLimit.timeLimit

    // this.time=0;
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
    if(this.game.isEnd){
    //if (this.timeLeft < 0) {
     // this.game.isEnd = true;
     
    }else if(this.insideRoom&&this.room.visitedRooms[this.inRoomNum]!=true){
      this.room.update()
      let isMiniGameComplete=this.room.checkDone()
      if(isMiniGameComplete){
        this.totalScore++
      }


    } else {
      //this.timeLeft -= elapsed;
      
      if(this.time>=1000){
        this.timeLeft-=1
        this.time=0
      }else{
        this.time+=elapsed
      }
      if(this.timeLeft<=0){
        
        this.scoreToDatabase.update(this.totalScore)
        this.game.isEnd=true
      }

      // document.querySelector('div#timeLimit.hud span').innerHTML = (JSON.stringify(Math.floor(this.timeLeft / 1000)));
      // document.querySelector('div#score.hud span').innerHTML = JSON.stringify(this.totalScore); //TODO goede score
      // this.progress.updateProgressBar();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if(this.keyboard.kPressed(84)){
        
          this.showKeys=true
        
      }
      if(this.keyboard.kPressed(89)){
        this.showKeys=false
      }
      

      // this.currentTrans = { x: trans.x, y: trans.y }
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      let trans = this.camera.checkScaling(this.canvas,this.particle)
      this.camera.createMatrix(trans.x, trans.y, 0, 0)
      this.ctx.translate(trans.x, trans.y)

      document.onmousemove = this.mouseDown.bind(this);

    
      this.count += 1;
      if (this.count >= 100) {
        if (this.count === 100) {
          this.score.forEach((element) => { this.totalScore += element.score; });
        }
      }
      // this.writeTextToCanvas(`${this.progression.getProgression()}%`, 20, this.canvas.width / 10 * 9, 20);
      // this.progression.pBar(this.ctx);
      // this.score[0].writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 20);

      if (this.keyboard.isKeyDown(82)) {
        // this.endGame = new EndGame(this.canvas);
        this.game.isEnd = true;
      }

    
      document.onmousemove = this.mouseDown.bind(this);
      
      let roomNum=this.particle.isInRoom(this.roomsIds)
      if(roomNum!=-1
        //&&this.keys.keys[roomNum]
        ){
        //player is inside a room or central hub
        this.insideRoom=true;
        this.inRoomNum=roomNum;
        this.room.setRoomId(this.inRoomNum)

        
        
      };
      this.count += 1;

     

      for(let i=0;i<this.agents.length;i++){
        this.agents[i].inSight(this.particle,this.ctx)
        this.agents[i].update(this.particle, this.borders);
        this.agents[i].move()

      }

      this.particle.update(this.mouse.x, this.mouse.y, this.borders);
      this.particle.hack(this.agents);
      this.particle.move()

      let timeHack=0
      if(this.agents[this.particle.hackAgent].status==="yellow"){
       timeHack=5000
      }else if(this.agents[this.particle.hackAgent].status==="orange"){
        timeHack=7000
       }else if(this.agents[this.particle.hackAgent].status==="red"){
        timeHack=9000
       }
      if(this.timeHacking<timeHack&&this.particle.hacking){
        this.timeHacking+=elapsed
      
      }else if(!this.particle.hacking){
        this.timeHacking=0
      }else if(this.timeHacking>=timeHack){
        let key=this.agents[this.particle.hackAgent].keyNum
        this.keys.keys[key]=true
        this.timeHacking=0
        if(this.agents[this.particle.hackAgent].status==="yellow"){
          this.agents[this.particle.hackAgent].status="orange"
         }else if(this.agents[this.particle.hackAgent].status==="orange"){
          this.agents[this.particle.hackAgent].status="red"
          }else if(this.agents[this.particle.hackAgent].status==="red"){
            this.agents[this.particle.hackAgent].mode="search"
          }else if(this.agents[this.particle.hackAgent].mode="search"){
            this.agents[this.particle.hackAgent].maxspeed+=0.2
          }
        //console.log("hacked room num:" ,key)
        for(let i=0;i<this.keys.keys.length;i++){
          if(!this.keys.inPossesion[i]){
            this.agents[this.particle.hackAgent].keyNum=i
            this.keys.inPossesion[i]=true
            break;
          }
        }

      }
    }
    
   
  }

  

  

  

  /**
   *
   */
  render() {
    // this.border.show()
   
    
    if(this.game.isEnd){
      //if (this.timeLeft - elapsed < 0) {
        this.game.isEnd = true;
      }else if(this.insideRoom&&this.room.visitedRooms[this.inRoomNum]!=true){
        this.room.render()
  
  
      } else {
        this.writeTextToCanvas("press t to show keys, press y to hide keys",20,window.innerWidth/2,30)
        this.writeTextToCanvas(`time left: ${this.timeLeft}`,20,100,40)
        this.writeTextToCanvas(`score: ${this.totalScore}`,20,window.innerWidth-100,40)

    this.particle.show();
    this.particle.animate();
    // this.writeTextToCanvas("hi",100,100)
    for (let i = 0; i < this.borders.length; i++) {
      this.borders[i].show();
    }
    this.particle.look(this.borders);

    this.writeTextToCanvas('Central hub', 20, this.canvas.width / 2, 400);

    for(let i=0;i<this.agents.length;i++){
    this.agents[i].show(this.ctx)
    this.agents[i].look(this.borders,this.ctx)
    }

    for(let i=0;i<this.roomsIds.length;i++){
      this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "rgb(255,0,0)";
        this.ctx.beginPath();
        this.ctx.arc(this.roomsIds[i][0], this.roomsIds[i][1], 10, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath()
        this.ctx.fill()
        this.writeTextToCanvas(this.roomsIds[i][2],20,this.roomsIds[i][0],this.roomsIds[i][1]-20)
    }
  }

  if(this.showKeys){
   this.keys.show(this.ctx)
   
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