import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game"

export default class MiniGameC extends MGMain{
    public ctx:CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    public started:boolean;
    private r:string;
    private e:string;
    private g:string;
    private n:string;
    private b:string
    private o:string;
    private q:string;
    private attempts:number;
    private wrong:string;
    private wrongLetter!: string;
    private gotit:number
    private pass!: string[];

    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas:HTMLCanvasElement){
      super(100,room);
      this.ctx=ctx
      this.canvas = canvas;
      this.started = true;
      this.r = '_';
      this.e = '_';
      this.g = '_';
      this.n = '_';
      this.b = '_';
      this.o = '_';
      this.q = '_';
      
      this.attempts = 5;
      this.gotit=0
      this.wrong = ``
    }
    //TODO: meerdere keren bosslevel kunnen starten


    public update(){
        this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
        if (this.attempts<=0){
            this.started = false;
            // this.room.getScene().getGame().isEnd = true;
            this.room.miniGameFinished=true
            this.room.answer=false
        }
        if(this.started){
            document.onkeydown = this.checkKey.bind(this);
        
            this.started=false
        }
        if(this.r!='_'&&this.e!='_'&&this.g!='_'&&this.n!='_'&&this.b!='_'&&this.o!='_'&&this.q!='_'){
            this.room.miniGameFinished=true
            this.room.answer=true

        }
    }

    private checkKey(e:any){
        if(e.keyCode===82) {
            this.r = 'R'
            
        } else if (e.keyCode===69) {
            this.e = 'e'
        } else if (e.keyCode===71) {
            this.g = 'g'
        } else if(e.keyCode===78) {
            this.n = 'n'
        } else if (e.keyCode===66) {
            this.b = 'b'
        } else if (e.keyCode===79) {
            this.o = 'o'
        } else if (e.keyCode===49) {
            this.q = '!'
        } else {
            this.attempts--;
            this.wrongLetter = String.fromCharCode(e.keyCode);
            this.wrong = `De letter: ${this.wrongLetter} is fout!`
        }
    }

    public render(){

        this.writeTextToCanvas(`Dit is de Grote Kluis`,30,50,200);
        this.writeTextToCanvas(`Kraak de kluis met de verzamelde hints`,20,50,250);
        this.writeTextToCanvas(`Verzamelde hints:`,20,50,300);
        this.writeTextToCanvas(`Pogingen: ${this.attempts}`,30,50,400);
        this.writeTextToCanvas("Let op je pogingen! Druk op de spatiebalk om de kamer te verlaten",20,50,500);
        this.room.getHintsGame().getHint().forEach((value: string, index: number) => {
            this.writeTextToCanvas(`${value}`, 20,200 + index * 30,350)
          })

        this.writeTextToCanvas(`${this.r} ${this.e} ${this.g} ${this.e} ${this.n} ${this.b} ${this.o} ${this.o} ${this.g} ${this.q}`, 50, window.innerWidth / 2, window.innerHeight / 2);

        this.writeTextToCanvas(this.wrong,20,window.innerWidth /2,window.innerHeight / 6);
        
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
    alignment: CanvasTextAlign = 'start',
    color: string = 'red',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
}