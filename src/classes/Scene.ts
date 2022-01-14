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

  private room: Room;

  private scoreToDatabase: ScoreToDatabase;

  private timeArray: number[];

  private keyboard: KeyboardListener;

  private camera: Camera;

  private agents: Array<Agent> = [];

  private timeLimit!: TimeLimit;
  private time: number;
  private timeLeft: number;
  public progress: Progress;

  private roomsIds: Array<any> = [];
  public insideRoom: boolean;
  private inRoomNum: number;

  public keys: Keys;

  public timeHacking: number;

  private showKeys: boolean;

  public lockedUp: number;

  private hints: Hints;

  public howGameEnded:
    | string
    /**
     * @param canvas
     * @param game
     */
    | undefined;

  private imgBank: HTMLImageElement;

  /**
   * @param canvas
   * @param game
   */
  constructor(canvas: HTMLCanvasElement, game: Game, time: number) {
    this.timeArray = [Date.now()];
    this.canvas = canvas;
    this.canvas.width = 1920;
    this.canvas.height = 969;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.camera = new Camera();
    this.lockedUp = 0;
    this.currentTrans = new Vector(0, 0);
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.keyboard = new KeyboardListener();
    this.insideRoom = false;
    this.inRoomNum = -1;
    this.keys = new Keys(this.ctx);
    this.timeHacking = 0;
    this.showKeys = false;
    this.scoreToDatabase = new ScoreToDatabase();

    this.imgBank = Game.loadNewImage("./img/background/bankheistmap.jpg");
    document.onkeydown = this.checkKeyScene.bind(this);

    this.game = game;

    this.progress = new Progress();
    this.room = new Room(0, this.ctx, this, this.canvas);
    console.log("window widht:", window.innerWidth);
    console.log("window height:", window.innerHeight);

    this.score = [];
    this.score.push(new Score(0));
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
      this.borders.push(new Border(x, y, x2, y2, this.ctx, "agent"));
    }
    // this.border= new Border(300,50,300,200,this.ctx)
    // this.ray=new Ray(50,150, this.ctx)
    this.particle = new Particle(
      100 + this.level.widthHall,
      100 + 0.5 * this.level.widthHall,
      this.ctx
    );
    this.agents.push(
      new Agent(
        1.5 * this.level.widthHall,
        100 + 1.5 * this.level.widthHall,
        this.ctx,
        this.level.widthHall,
        "random",
        0,
        "yellow"
      )
    );
    this.agents.push(
      new Agent(
        this.canvas.width / 2 + 3.5 * this.level.widthHall,
        300 + 2 * this.level.widthHall,
        this.ctx,
        this.level.widthHall,
        "random",
        1,
        "orange"
      )
    );
    this.agents.push(
      new Agent(
        this.canvas.width / 2 + 12.5 * this.level.widthHall,
        300 + 8 * this.level.widthHall,
        this.ctx,
        this.level.widthHall,
        "random",
        2,
        "yellow"
      )
    );
    this.agents.push(
      new Agent(
        this.canvas.width / 2 - 0.5 * this.level.widthHall,
        100 + 3 * this.level.widthHall,
        this.ctx,
        this.level.widthHall,
        "random",
        3,
        "red"
      )
    );
    this.keys.inPossesion[0] = true;
    this.keys.inPossesion[1] = true;
    this.keys.inPossesion[2] = true;
    this.keys.inPossesion[3] = true;
    this.mouse = { x: 0, y: 0 };

    // window.addEventListener("mousemove",this.mouseDown.bind(this), false)
    this.count = 0;

    //this.timeLimit = new TimeLimit(this.game.password);
    this.timeLeft = time;

    this.time = 0;

    this.hints = this.room.getHintsGame();
  }

  public checkKeyScene(e: any) {
    // console.log(e.keyCode-48)
    if (e.keyCode >= 48 && e.keyCode <= 57 && this.insideRoom === false) {
      this.room.setRoomId(e.keyCode - 48);
      this.inRoomNum = e.keyCode - 48;
     // this.insideRoom = true;

      document.onkeydown = this.checkKeyScene.bind(this);
    }
  }

  /**
   *
   */
  processInput() {}

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

  /**
   * update the scene
   *@param elapsed time passed
   */
  update(elapsed: number): void {
    if (
      this.insideRoom
      //&&(
      //this.room.visitedRooms[this.inRoomNum]!=true||
      //this.inRoomNum===80||this.inRoomNum===100)
    ) {
      this.room.update();
      let isMiniGameComplete = this.room.checkDone();
      if (isMiniGameComplete === true) {
        this.totalScore++;
      }
      if (isMiniGameComplete != 80 && isMiniGameComplete != false) {
        this.keys.total--;
      }
      if (isMiniGameComplete === 100) {
        this.howGameEnded = "gekraakt";
        this.game.isEnd = true;
      } else if (isMiniGameComplete === 101) {
        this.howGameEnded = "outofattempts";
        this.game.isEnd = true;
      } else if (isMiniGameComplete === 80) {
        this.particle.pos.x =
          this.canvas.width / 2 + 18.5 * this.level.widthHall;
        this.particle.pos.y = 100 + 2 * this.level.widthHall;
      }
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //tijd aftellen
      if (this.time >= 1000) {
        this.timeLeft -= 1;
        this.time = 0;
      } else {
        this.time += elapsed;
      }
      //tijd om ? game over, score naar database
      if (this.timeLeft <= 0) {
        this.scoreToDatabase.update(this.totalScore);
        this.game.isEnd = true;
      }

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
      // let roomNum = this.particle.isInRoom(this.roomsIds);
      // if (roomNum != -1 && (this.keys.total > 0 || roomNum === 80)) {
      //   //player is inside a room or central hub
      //   this.insideRoom = true;
      //   this.inRoomNum = roomNum;
      //   this.room.setRoomId(this.inRoomNum);
      // }

      if(this.keyboard.isKeyDown(81)){
        this.insideRoom = true;
        

      }

      //check if player is insight of agents
      for (let i = 0; i < this.agents.length; i++) {
        if (Vector.dist(this.particle.pos, this.agents[i].pos) < 80) {
          let inSight = this.agents[i].inSight(
            this.particle,
            this.ctx,
            this.borders
          );
          if (inSight) {
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
            this.lockedUp++;
            this.particle.pos.x =
              this.canvas.width / 2 + 18 * this.level.widthHall;
            this.particle.pos.y = 100 + 5 * this.level.widthHall;
          }
        }

        //updateing and moving agents
        this.agents[i].update(this.particle, this.borders);
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

      //updateing player position
      this.particle.update(this.mouse.x, this.mouse.y, this.borders);
      this.particle.hack(this.agents);
      this.particle.move();

      //hack agents and retrieve keys
      let timeHack = 5000;
      if (this.agents[this.particle.hackAgent].status === "yellow") {
        timeHack = 5000;
      } else if (this.agents[this.particle.hackAgent].status === "orange") {
        timeHack = 7000;
      } else if (this.agents[this.particle.hackAgent].status === "red") {
        timeHack = 9000;
      }

      if (this.timeHacking < timeHack && this.particle.hacking) {
        this.timeHacking += elapsed;
      } else if (!this.particle.hacking) {
        this.timeHacking = 0;
      } else if (
        this.timeHacking >= timeHack &&
        this.agents[this.particle.hackAgent].sleeping === false
      ) {
        let key = this.agents[this.particle.hackAgent].keyNum;
        this.agents[this.particle.hackAgent].sleeping = true;
        this.keys.keys[key] = true;
        this.keys.total++;
        this.timeHacking = 0;
        if (this.agents[this.particle.hackAgent].status === "yellow") {
          this.agents[this.particle.hackAgent].status = "orange";
        } else if (this.agents[this.particle.hackAgent].status === "orange") {
          this.agents[this.particle.hackAgent].status = "red";
          this.agents[this.particle.hackAgent].maxspeed += 0.25;
        } else if (this.agents[this.particle.hackAgent].status === "red") {
          this.agents[this.particle.hackAgent].mode = "search";
          this.agents[this.particle.hackAgent].maxspeed += 0.25;
        } else if ((this.agents[this.particle.hackAgent].mode = "search")) {
          this.agents[this.particle.hackAgent].maxspeed += 0.2;
        }
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
  }

  public gethintGame() {
    return this.hints;
  }

  public getGame() {
    return this.game;
  }

  /**
   *render the scene
   */
  public render():void {
    if (
      this.insideRoom
      //&&(
      //this.room.visitedRooms[this.inRoomNum]!=true||
      //this.inRoomNum===80||this.inRoomNum===100)
    ) {
      this.room.render();
    } else {
      //draw time left
      this.writeTextToCanvas(`time left: ${this.timeLeft}`, 20, 100, 40);
      this.writeTextToCanvas(
        `score: ${this.totalScore}`,
        20,
        window.innerWidth - 100,
        40
      );
      //draw voortgang
      this.writeTextToCanvas(
        `voortgang: ${this.progress.progressNum}%`,
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
      this.hints.getHint().forEach((value: string, index: number) => {
        this.writeTextToCanvas(
          `${value}`,
          25,
          window.innerWidth / 4 + index * 40,
          window.innerHeight / 15
        );
      });
      //draw tekst grote kluis midden scherm
      this.writeTextToCanvas(
        "Grote Kluis",
        30,
        this.canvas.width / 2 - 2 * this.level.widthHall,
        400,
        "start",
        "black"
      );

      //draw background
      this.ctx.drawImage(
        this.imgBank,
        550,
        800,
        1150,
        750,
        this.canvas.width / 2 - 4 * this.level.widthHall,
        100 + 5 * this.level.widthHall,
        7 * this.level.widthHall,
        4 * this.level.widthHall
      );

      //show the player
      this.particle.show();
      this.particle.animate();
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
      for (let i = 0; i < this.roomsIds.length; i++) {
        if (this.roomsIds[i][2] != "100") {
          this.ctx.lineWidth = 1;
          this.ctx.fillStyle = "rgb(255,0,0)";
          this.ctx.beginPath();
          this.ctx.arc(
            this.roomsIds[i][0],
            this.roomsIds[i][1],
            10,
            0,
            2 * Math.PI
          );
          this.ctx.stroke();
          this.ctx.closePath();
          this.ctx.fill();
          this.writeTextToCanvas(
            this.roomsIds[i][2],
            20,
            this.roomsIds[i][0],
            this.roomsIds[i][1] - 20
          );
        }
      }
    }

    //show the keys on top screen
    this.keys.show(this.ctx);
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
