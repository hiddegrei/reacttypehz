import KeyboardListener from "./KeyboardListener";
import MiniGame0 from "./minigames/MiniGame0";
import MiniGame10 from "./minigames/MiniGame10";
import MiniGame11 from "./minigames/MiniGame11";
import MiniGame12 from "./minigames/MiniGame12";
import MiniGame13 from "./minigames/MiniGame13";
import MiniGame14 from "./minigames/MiniGame14";
import MiniGame1 from "./minigames/MiniGame1";
import MiniGame2 from "./minigames/MiniGame2";
import MiniGame3 from "./minigames/MiniGame3";
import MiniGame4 from "./minigames/MiniGame4";
import MiniGame5 from "./minigames/MiniGame5";
import MiniGame6 from "./minigames/MiniGame6";
import MiniGame7 from "./minigames/MiniGame7";
import MiniGame8 from "./minigames/MiniGame8";
import MiniGame9 from "./minigames/MiniGame9";
import Scene from "./Scene";
import MiniGameP from "./minigames/MiniGameP";
import Hints from "./Hints";
import MiniGameC from "./minigames/MiniGameC";
import MiniGameShop from "./minigames/MiniGameShop";

export default class Room{
  private static readonly TIMEOUT_ROOMS=40000
    public visitedRooms:Array<boolean>=[];
    public timeoutRooms:any[]=[] ;
    public roomId:number
    public ctx:CanvasRenderingContext2D;
    protected keyboard:KeyboardListener;
    public scene:Scene;
    private minigame0:MiniGame0
    private minigame1:MiniGame1
    private minigame2:MiniGame2
    private minigame3:MiniGame3
    private minigame4:MiniGame4
    private minigame5:MiniGame5
    private minigame6:MiniGame6
    private minigame7:MiniGame7
    private minigame8:MiniGame8
    private minigame9:MiniGame9
    private minigame10:MiniGame10
    private minigame11:MiniGame11
    private minigame12:MiniGame12
    private minigame13:MiniGame13
    private minigame14:MiniGame14
    private minigameC:MiniGameC;
    private minigameP:MiniGameP
    private minigameShop:MiniGameShop;
    public hints: Hints;

    public miniGameFinished:boolean
    public answer:boolean
    public canvas:HTMLCanvasElement

    private img!: HTMLImageElement;
    public mgTimeLeft:number
    

   

    


    constructor(roomId:number,ctx:CanvasRenderingContext2D,scene:Scene,canvas:HTMLCanvasElement){
        // super(roomId,ctx,scene)
        this.roomId=roomId
        this.ctx=ctx
        this.mgTimeLeft=0
        this.keyboard=new KeyboardListener()
        this.scene=scene
        this.canvas=canvas
        this.hints = new Hints(this.canvas,this.scene);
        this.minigame0=new MiniGame0(this.ctx,this, this.canvas)
        this.minigame1=new MiniGame1(this.ctx,this, this.canvas)
        this.minigame2=new MiniGame2(this.ctx,this, this.canvas)
        this.minigame3=new MiniGame3(this.ctx,this, this.canvas)
        this.minigame4=new MiniGame4(this.ctx,this, this.canvas)
        this.minigame5=new MiniGame5(this.ctx,this, this.canvas)
        this.minigame6=new MiniGame6(this.ctx,this, this.canvas)
        this.minigame7=new MiniGame7(this.ctx,this, this.canvas)
        this.minigame8=new MiniGame8(this.ctx,this, this.canvas)
        this.minigame9=new MiniGame9(this.ctx,this, this.canvas)
        this.minigame10=new MiniGame10(this.ctx,this, this.canvas)
        this.minigame11=new MiniGame11(this.ctx,this, this.canvas)
        this.minigame12=new MiniGame12(this.ctx,this, this.canvas)
        this.minigame13=new MiniGame13(this.ctx,this, this.canvas)
        this.minigame14=new MiniGame14(this.ctx,this, this.canvas)
        this.minigameC=new MiniGameC(this.ctx,this,this.canvas)
        this.minigameP=new MiniGameP(this.ctx,this, this.canvas)
        this.minigameShop=new MiniGameShop(this.ctx,this, this.canvas)

        this.miniGameFinished=false
        this.answer=false

        
        

        for(let i=0;i<18;i++){
            this.visitedRooms[i]=false
            this.timeoutRooms[i]=[0,false]
           
            
        }
        this.timeoutRooms[80]=[0,false]
        this.timeoutRooms[90]=[0,false]
        this.timeoutRooms[100]=[0,false]
        
    }

    public checkDone(){
      if((this.keyboard.isKeyDown(32)&&this.roomId!==80)||this.miniGameFinished){
        this.scene.insideRoom=false
        
        if(this.answer){
          console.log(this.roomId)
          
          this.visitsNew(this.roomId)
          if(this.roomId===80){
            //this.minigameP.started=true
           
            this.miniGameFinished=false
            this.answer=false
            
            this.minigameP.started=true
            return 80

          }else if(this.roomId===100){
            //this.minigameP.started=true
            
           
            this.miniGameFinished=false
            this.answer=false
            this.minigameC.started=true
            return 100

          }else{
            
            this.miniGameFinished=false
            this.answer=false
            
            return this.roomId;

          }
         
        }else if(this.roomId===100){
          this.miniGameFinished=false
          //timeout room
          return 101
        }else if(this.roomId===90){
          this.miniGameFinished=false
          //timeout room
          return 90
        }else if(this.roomId===80){
          this.miniGameFinished=false
          //timeout room
          return 81
        }
        else{
          //timeout room
          this.miniGameFinished=false
          this.timeoutRooms[this.roomId]=[0,true]
          return -1
        }
      }
      return false

    }

    public update(mousex:number,mousey:number,elapsed:number){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.scene.camera.createMatrix(0, 0, 0, 0);
      this.ctx.translate(0, 0);
       
      // eval(` this.minigame${this.roomId}(update`)
        if(this.roomId===0){
          this.minigame0.update(mousex,mousey,elapsed)
        }else if(this.roomId===1){
          this.minigame1.update(mousex,mousey,elapsed)
        }else if(this.roomId===2){
          this.minigame2.update(elapsed)
        }else if(this.roomId===3){
          this.minigame3.update(mousex,mousey,elapsed)
        }else if(this.roomId===4){
          this.minigame4.update(elapsed)
        }else if(this.roomId===5){
          this.minigame5.update(elapsed)
        }else if(this.roomId===6){
          this.minigame6.update(elapsed)
        }else if(this.roomId===7){
          this.minigame7.update(elapsed)
        }else if(this.roomId===8){
          this.minigame8.update(mousex,mousey,elapsed)
        }else if(this.roomId===9){
          this.minigame9.update(elapsed)
        }else if(this.roomId===10){
          this.minigame10.update(elapsed)
        }else if(this.roomId===11){
          this.minigame11.update(elapsed)
        }else if(this.roomId===12){
          this.minigame12.update(elapsed)
        }else if(this.roomId===13){
          this.minigame13.update(elapsed)
        }else if(this.roomId===14){
          this.minigame14.update(elapsed)
        }else if (this.roomId===100) {
          this.minigameC.update(elapsed)
        }else if(this.roomId===80){
          this.minigameP.update(this.scene.lockedUp,elapsed)
        }else if(this.roomId===90){
          this.minigameShop.update(mousex,mousey,elapsed)
        }
       

    }

    public getScene(){
      return this.scene;
    }

    public render(){
        // this.writeTextToCanvas(`room: ${this.roomId}`,20,100,100)
        //this.writeTextToCanvas("press spacebar to leave room",20,700,600)

        if(this.roomId===0){
          this.minigame0.render()
        }else if(this.roomId===1){
          this.minigame1.render()
        }
        else if(this.roomId===2){
          this.minigame2.render()
        }else if(this.roomId===3){
          this.minigame3.render()
        }else if(this.roomId===4){
          this.minigame4.render()
        }else if(this.roomId===5){
          this.minigame5.render()
        }else if(this.roomId===6){
          this.minigame6.render()
        }else if(this.roomId===7){
          this.minigame7.render()
        }else if(this.roomId===8){
          this.minigame8.render()
        }else if(this.roomId===9){
          this.minigame9.render()
        }else if(this.roomId===10){
          this.minigame10.render()
        }else if(this.roomId===11){
          this.minigame11.render()
        }else if(this.roomId===12){
          this.minigame12.render()
        }else if(this.roomId===13){
          this.minigame13.render()
        }else if(this.roomId===14){
          this.minigame14.render()
        }else if(this.roomId===80){
          this.minigameP.render()
        }else if (this.roomId===100) {
          this.minigameC.render()
        }else if(this.roomId===90){
          this.minigameShop.render()
        }

    }

    public setRoomId(roomId:number){
        this.roomId=roomId
        

    }

    public getHintsGame() {
      return this.hints;
    }

    public visitsNew(roomId:number){
      
        this.visitedRooms[roomId]=true
       // console.log(roomId,this.visitedRooms[roomId])
    }

    public timeOutRooms(elapsed:number){
      for (let i = 0; i < 17; i++) {
        if (
          this.timeoutRooms[i][1] === true &&
          this.timeoutRooms[i][0] >= Room.TIMEOUT_ROOMS
        ) {
          this.timeoutRooms[i] = [0, false];
        } else {
          this.timeoutRooms[i][0] += elapsed;
        }
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

  /**
   * @param min
   * @param max
   */
  static randomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
   
  /**
   * @param source
   */
   static loadNewImage(source: string) {
    const img = new Image();
    img.src = source;
    return img;
  }

  static drawImageScaled(ctx: CanvasRenderingContext2D,
    img: string,
    imgWidth: number,
    imgHeight: number,
    xPos: number,
    yPos: number) {
    let image = Room.loadNewImage(img);
    ctx.drawImage(
      image,
      0,
      0,
      image.width / imgWidth,
      image.height / imgHeight,
      xPos,
      yPos,
      window.innerWidth,
      window.innerHeight,
    );
  }
}