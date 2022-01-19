import Game from "./Game";
import Border from "./Border";
import Ray from "./Ray";
import Particle from "./Particle";
import Level1map from "./Level1map";
import Score from "./Score";
import EndGame from "./EndGame";
import Vector from "./Vector";
import KeyboardListener from "./KeyboardListener";
import Camera from "./Camera";
import TimeLimit from "./TimeLimit";
import Agent from "./Agent";
import Progress from "./Progress";
import Room from "./Room";
import Keys from "./Keys";
import ScoreToDatabase from "./ScoreToDatabase";
import Hints from "./Hints";
import SceneInfo from "./SceneInfo";
import CameraAgent from "./CameraAgent";

export default class Scene {
  public canvas: HTMLCanvasElement;

  public static readonly POINTS_WIN_MG = 100;
  public static readonly POINTS_LOSS_MG = 25;
  public static readonly CAUGHT_AGENTS = 300;
  public static readonly WIN_BOSSLEVEL = 500;

  public ctx: CanvasRenderingContext2D;

  private sceneInfo: SceneInfo;

  public game: Game;

  public borders: Array<Border> = [];

  public particle = <any>{};

  public mouse = <any>{};

  public level: Level1map;

  public cameraAgents: CameraAgent[] = [];

  static SPACE = 300;

  public score: Score;

  public totalScore: number;

  public widthHall!: number;

  public currentTrans: Vector;

  private room: Room;

  private keyboard: KeyboardListener;

  public camera: Camera;

  private agents: Array<Agent> = [];

  private time: number;

  private timeLeft: number;

  public progress: Progress;

  private roomsIds: Array<any> = [];

  public insideRoom: boolean;

  private inRoomNum: number;

  public keys: Keys;

  public timeHacking: number;

  public lockedUp: number;

  private hints: Hints;

  public howGameEnded!: string;

  private imgBank: HTMLImageElement;

  private keyDown!: number;

  private playerRadius: number;

  private timeTurnAroundAgents: number;

  private testImg: HTMLImageElement;

  private flash: number;

  // private agentMid:Agent

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game, time: number) {
    this.canvas = canvas;
    this.canvas.width = 1920;
    this.testImg = Game.loadNewImage("./img/objects/gold_trophytest.png");
    this.canvas.height = 1500;
    this.playerRadius = 200;
    this.timeTurnAroundAgents = 0;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.camera = new Camera();
    this.lockedUp = 0;
    this.currentTrans = new Vector(0, 0);
    this.sceneInfo = new SceneInfo(this.canvas, this.ctx);
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.keyboard = new KeyboardListener();
    this.insideRoom = false;
    this.inRoomNum = -1;
    this.keys = new Keys(this.ctx);
    this.timeHacking = 0;
    this.flash = 1;

    this.imgBank = Game.loadNewImage("./img/background/bankheistmap.jpg");

    document.onkeydown = this.checkKeyScene.bind(this);

    this.game = game;

    this.progress = new Progress();

    this.room = new Room(0, this.ctx, this, this.canvas);
    this.hints = this.room.getHintsGame();

    this.score = new Score(0);

    this.totalScore = 0;
    this.borders = [];
    this.level = new Level1map(this.canvas, this.ctx);
    this.roomsIds = this.level.rooms;

    for (let i = 0; i < this.level.level1.length; i++) {
      const x = this.level.level1[i][0];
      const y = this.level.level1[i][1];
      const x2 = this.level.level1[i][2];
      const y2 = this.level.level1[i][3];
      this.borders.push(new Border(x, y, x2, y2, this.ctx, "normal"));
    }

    for (let i = 0; i < this.level.agentBorders.length; i++) {
      const x = this.level.agentBorders[i][0];
      const y = this.level.agentBorders[i][1];
      const x2 = this.level.agentBorders[i][2];
      const y2 = this.level.agentBorders[i][3];
      const type = this.level.agentBorders[i][4];
      this.borders.push(new Border(x, y, x2, y2, this.ctx, type));
    }
    // this.border= new Border(300,50,300,200,this.ctx)
    // this.ray=new Ray(50,150, this.ctx)

    this.particle = new Particle(
      (this.canvas.width / 2) - 11 * this.level.widthHall,
      100 + 16.5 * this.level.widthHall,
      this.ctx
    );

    this.agents = this.sceneInfo.loadAgents(this.level.widthHall)

    //agent linksboven
    this.cameraAgents.push(new CameraAgent(100 - this.level.widthHall, 100, this.ctx, this.level.widthHall, 80, 100 + this.level.widthHall, 100 + this.level.widthHall))



    this.keys.inPossesion[0] = true;
    this.keys.inPossesion[1] = true;
    this.keys.inPossesion[2] = true;
    this.keys.inPossesion[3] = true;
    this.mouse = { x: 0, y: 0 };

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)

    //this.timeLimit = new TimeLimit(this.game.password);
    this.timeLeft = time;

    this.time = 0;
  }



  public directorAlert(number: number) {
    let ctxAlert = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    if (number === 1) {
      ctxAlert.strokeStyle = "rgb(0,0,0)";
      ctxAlert.fillStyle = "rgb(255,0,0,0.8)";
      ctxAlert.beginPath();
      ctxAlert.rect(0, 0, window.innerWidth, window.innerHeight);
      ctxAlert.closePath();
      ctxAlert.stroke();
      ctxAlert.fill();
    }

    ctxAlert.drawImage(this.testImg, 100, 100);
    ctxAlert.strokeStyle = "rgb(0,0,0)";
    ctxAlert.fillStyle = "rgb(255,255,255)";
    ctxAlert.beginPath();
    ctxAlert.rect(0, window.innerHeight / 2.5, 500, 50);
    ctxAlert.closePath();
    ctxAlert.stroke();
    ctxAlert.fill();

    ctxAlert.font = `30px sans-serif`;
    ctxAlert.fillStyle = 'red';
    ctxAlert.textAlign = 'left';
    ctxAlert.fillText("Directeur: M. Oney", 200, window.innerHeight / 2.2);
  }

  public checkKeyScene(e: any) {
    // console.log(e.keyCode-48)
    // if (e.keyCode >= 48 && e.keyCode <= 57 && this.insideRoom === false) {
    //   this.room.setRoomId(e.keyCode - 48);
    //   this.inRoomNum = e.keyCode - 48;
    //  // this.insideRoom = true;

    //   document.onkeydown = this.checkKeyScene.bind(this);
    // }
    if (e.keyCode === 49) {
      this.room.setRoomId(100);
      this.inRoomNum = 100;
      // this.insideRoom = true;

      document.onkeydown = this.checkKeyScene.bind(this);
    }
  }

  /**
   *
   */
  processInput() { }

  /**
   * @param e
   */
  mouseDown(e: MouseEvent) {
    // this.particle.update(window.event.clientX,window.event.clientY)
    this.mouse = this.camera.toWorld(e.clientX, e.clientY);
    //console.log(this.mouse)
  }

  public getProgress() {
    return this.progress;
  }

  public legalInsideRoom(): boolean {
    if (
      this.insideRoom &&
      (this.room.visitedRooms[this.inRoomNum] != true ||
        this.inRoomNum === 80 ||
        this.inRoomNum === 100) &&
      this.room.timeoutRooms[this.inRoomNum][1] != true
    ) {
      return true;
    } else {
      return false;
    }
  }



  /**
   * update the scene
   *@param elapsed time passed
   */
  public update(elapsed: number): void {
    if (this.legalInsideRoom()) {
      this.room.update(this.mouse.x, this.mouse.y, elapsed);
      document.onmousemove = this.mouseDown.bind(this);
      this.specialCasesMinigame()

    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //tijd aftellen
      this.updateTime(elapsed)
      // transform canvas en camera
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      let trans = this.camera.checkScaling(this.canvas, this.particle);
      this.camera.createMatrix(trans.x, trans.y, 0, 0);
      this.ctx.translate(trans.x, trans.y);
      //register mouse position to move the player
      document.onmousemove = this.mouseDown.bind(this);
      //Developers
      if (this.keyboard.isKeyDown(82)) {
        this.game.isEnd = true;
      }
      //
      //check in what room the player is if any
      this.isPlayerInRoom()
      //check if player is insight of agents
      this.isPlayerInSightAndUpdate(elapsed)
      //updateing player position
      this.particle.update(this.mouse.x, this.mouse.y, this.borders);
      this.particle.hack(this.agents);
      this.particle.animate();
      this.particle.move();
      //hack agents and retrieve keys
      this.playerHackAgents(elapsed)
      //timeout rooms
      this.room.timeOutRooms(elapsed)

      //update camerasAgent
      for (let i = 0; i < this.cameraAgents.length; i++) {
        this.cameraAgents[i].update()
        this.cameraAgents[i].look(this.borders, this.ctx)

      }
      this.isPlayerInSightCameras()
    }


  }



  /**
   *render the scene
   */
  public render(): void {
    if (this.legalInsideRoom()) {
      this.room.render();
    } else {
      // for(let i=0;i<this.canvas.width;i+=50){
      //   for(let j=0;j<this.canvas.height;j+=50){
      //     this.ctx.drawImage(this.imgBank,850,870,50,50,i,j,50,50)
      //   }

      // }
      //kamer1 background
      // this.ctx.drawImage(this.imgBank,1000,200,2*this.level.widthHall,3*this.level.widthHall,100+5*this.level.widthHall+10,100+2*this.level.widthHall,2*this.level.widthHall,3*this.level.widthHall)

      this.sceneInfo.renderBackgroundImages(this.level.widthHall, this.imgBank);
      //show the player
      this.particle.show(false, "green");
      // show the borders
      for (let i = 0; i < this.borders.length; i++) {
        this.borders[i].show();
      }
      //show the agents
      for (let i = 0; i < this.agents.length; i++) {
        this.agents[i].show(this.ctx);
        this.agents[i].look(this.borders, this.ctx);
      }
      //show the room ids(rondjes)
      this.level.showRoomIds(this.room);
      //show the keys on top screen
      this.keys.show(this.ctx);

      //render info on top
      this.sceneInfo.renderInfo(
        this.timeLeft,
        this.score.scoreProperty,
        this.progress.progressNum,
        this.hints
      );

      //render agentcamera
      for (let i = 0; i < this.cameraAgents.length; i++) {
        this.cameraAgents[i].show(this.ctx)
      }

      this.allAgentAlert(1897, 1898);
      this.allAgentAlert(1890, 1891);
    }
  }

  private allAgentAlert(timeleftA: number, timeleftB: number) {
    if (this.timeLeft >= timeleftA && this.timeLeft <= timeleftB) {
      if (this.flash === 1) {
        this.directorAlert(1);
        this.flash++;
      } else if (this.flash >= 5) {
        this.directorAlert(0);
        this.flash = 1;
      } else {
        this.directorAlert(0);
        this.flash++;
      }
    }
  }

  public isPlayerInSightCameras() {

    for (let i = 0; i < this.cameraAgents.length; i++) {
      if (Vector.dist(this.particle.pos, this.cameraAgents[i].pos) < 80) {
        let inSight = this.cameraAgents[i].inSight(
          this.particle,
          this.ctx,
          this.borders
        );
        if (inSight) {
          //this.totalScore-=Scene.CAUGHT_AGENTS
          this.score.caughtAgents();
          if (this.lockedUp === 2) {
            this.game.isEnd = true;
            this.howGameEnded = "caught";
          }
          if (this.cameraAgents.length <= 5) {
            this.agents.push(
              new Agent(
                100 + 5 * this.level.widthHall,
                100 + 0.5 * this.level.widthHall,
                this.ctx,
                this.level.widthHall,
                "random",
                this.cameraAgents.length,
                "yellow"
              )
            );
          }
          //player in room
          // this.lockedUp++;
          this.particle.pos.x =
            this.canvas.width / 2 + 18 * this.level.widthHall;
          this.particle.pos.y = 100 + 5 * this.level.widthHall;
        }
      }


    }

  }
  public gethintGame() {
    return this.hints;
  }

  public getGame() {
    return this.game;
  }

  /**
   * check if player is in a room
   */
  public isPlayerInRoom() {
    let roomNum = this.particle.isInRoom(this.roomsIds);
    if (
      roomNum != -1 &&
      (this.keys.total > 0 || roomNum === 80 || roomNum === 90) &&
      this.room.timeoutRooms[roomNum][1] != true
    ) {
      //player is inside a room or central hub
      this.insideRoom = true;
      this.inRoomNum = roomNum;
      this.room.setRoomId(this.inRoomNum);
    } else if (this.keyboard.isKeyDown(84)) {
      this.insideRoom = true;
      this.inRoomNum = 2;
      this.room.setRoomId(2);
    }

  }

  /**
   * if close enough, player hacks the agents
   * @param elapsed number
   */
  public playerHackAgents(elapsed: number) {

    if (
      this.particle.hackIndex < this.particle.hackRange &&
      this.particle.hacking
    ) {
      this.timeHacking += elapsed;
    } else if (!this.particle.hacking) {
      //this.timeHacking = 0;
      this.particle.hackIndex = 0;
    } else if (
      //this.timeHacking >= timeHack &&
      this.particle.hackIndex >= this.particle.hackRange &&
      this.agents[this.particle.hackAgent].sleeping === false
    ) {
      let key = this.agents[this.particle.hackAgent].keyNum;
      this.agents[this.particle.hackAgent].sleeping = true;
      this.keys.keys[key] = true;
      this.keys.total++;
      this.timeHacking = 0;
      this.particle.setHackIndex(0);
      this.agents[this.particle.hackAgent].updateAttributes();

      // console.log("hacked room num:" ,key)
      for (let i = 0; i < this.keys.keys.length; i++) {
        if (!this.keys.inPossesion[i]) {
          this.agents[this.particle.hackAgent].keyNum = i;
          this.keys.inPossesion[i] = true;
          break;
        }
      }
    }
  }

  /**
   * check if player is in sight of agents
   * @param elapsed number
   */
  public isPlayerInSightAndUpdate(elapsed: number) {
    for (let i = 0; i < this.agents.length; i++) {
      if (Vector.dist(this.particle.pos, this.agents[i].pos) < 80) {
        let inSight = this.agents[i].inSight(
          this.particle,
          this.ctx,
          this.borders
        );
        if (inSight) {
          //this.totalScore-=Scene.CAUGHT_AGENTS
          this.score.caughtAgents();
          if (this.lockedUp === 2) {
            this.game.isEnd = true;
            this.howGameEnded = "caught";
          }
          if (this.agents.length <= 5) {
            this.agents.push(
              new Agent(
                100 + 5 * this.level.widthHall,
                100 + 0.5 * this.level.widthHall,
                this.ctx,
                this.level.widthHall,
                "random",
                this.agents.length,
                "yellow"
              )
            );
          }
          //player in room
          // this.lockedUp++;
          this.particle.pos.x =
            this.canvas.width / 2 + 18 * this.level.widthHall;
          this.particle.pos.y = 100 + 5 * this.level.widthHall;
        }
      }

      //updateing and moving agents
      this.agents[i].updateTarget(this.canvas, this.level.widthHall, this.particle.pos)
      this.agents[i].update(this.borders)

      this.agents[i].move();
      //this.agents[i].look(this.borders,this.ctx)
      //check if agent is still inactive, increment sleeping time if still sleeping
      if (this.agents[i].sleepingTime >= 20000) {
        this.agents[i].sleepingTime = 0;
        this.agents[i].sleeping = false;
      } else {
        this.agents[i].sleepingTime += elapsed;
      }
    }

  }





  /**
   * update time
   * @param elapsed time passed since last frame
   */
  public updateTime(elapsed: number) {
    if (this.time >= 1000) {
      this.timeLeft -= 1;
      this.time = 0;
    } else {
      this.time += elapsed;
    }
    //tijd om ? game over, score naar database
    if (this.timeLeft <= 0) {
      // this.scoreToDatabase.update(this.score.scoreProperty);
      this.game.isEnd = true;
    }

  }


  /**
   * Check what room player came from and what happend in room
   */
  public specialCasesMinigame() {
    let isMiniGameComplete = this.room.checkDone();
    if (isMiniGameComplete === 0) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      //this.totalScore+=Scene.POINTS_WIN_MG;
      this.score.miniGameComplete(this.room.mgTimeLeft);
      this.keys.total--;
      this.hints.foundHintInScene(isMiniGameComplete);
    }

    if (isMiniGameComplete === -1) {
      //this.totalScore-=Scene.POINTS_LOSS_MG
      this.score.miniGameLossed();
    }

    if (
      isMiniGameComplete != 80 &&
      isMiniGameComplete != 100 &&
      isMiniGameComplete != 101 &&
      isMiniGameComplete != 81 &&
      isMiniGameComplete != 90 &&
      isMiniGameComplete != false
    ) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      // this.totalScore++;
      this.score.miniGameComplete(this.room.mgTimeLeft);
      this.keys.total--;
      //isMiniGameComplete is de variable die het nummer van de minigame bevat als de minigame succesvol is afgerond
      this.hints.foundHintInScene(isMiniGameComplete);
    }
    if (isMiniGameComplete === 100) {
      //this.totalScore+=Scene.WIN_BOSSLEVEL
      this.score.winBossLevel();
      // this.scoreToDatabase.update(this.score.scoreProperty);
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.howGameEnded = "gekraakt";
      this.game.isEnd = true;
    } else if (isMiniGameComplete === 101) {
      // this.scoreToDatabase.update(this.score.scoreProperty);
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.howGameEnded = "outofattempts";
      this.game.isEnd = true;
      this.particle.pos.x = this.canvas.width / 2 + this.level.widthHall;
      this.particle.pos.y = 100 + 5 * this.level.widthHall + 20;
    } else if (isMiniGameComplete === 90) {
      this.room.answer = false;
      this.room.miniGameFinished = false;

      this.particle.pos.x = this.canvas.width / 2 - 18 * this.level.widthHall;
      this.particle.pos.y = 300 + 12.5 * this.level.widthHall;
    } else if (isMiniGameComplete === 80) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.particle.pos.x =
        this.canvas.width / 2 + 18.5 * this.level.widthHall;
      this.particle.pos.y = 100 + 2 * this.level.widthHall;
      this.lockedUp++;
    } else if (isMiniGameComplete === 81) {
      this.room.answer = false;
      this.room.miniGameFinished = false;
      this.particle.pos.x =
        this.canvas.width / 2 + 18.5 * this.level.widthHall;
      this.particle.pos.y = 100 + 2 * this.level.widthHall;
      this.lockedUp++;
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
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
// # sourceMappingURL=Scene.js.map
