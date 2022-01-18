
        import Room from "../Room";
        import MGMain from "./MGMain";
        import Game from "../Game"
        import Hints from "../Hints";
        import Particle from "../Particle"
        import Border from "../Border";
        import Vector from "../Vector";
        
        export default class MiniGame3 extends MGMain{
            
        
            
        
            private particle:Particle
        
            private borders:Border[]=[]
        
            private color:string;
            
            private answer1:boolean
        

            
        /**
           * Create an instance of this object
           * @param ctx canvas rendering context 2D
           * @param room A room
           * @param canvas canvas
           */
            constructor(ctx:CanvasRenderingContext2D,room:Room,canvas:HTMLCanvasElement){
              super(3,room,ctx,canvas,[],[])
              this.ctx=ctx
              this.image = Game.loadNewImage("./img/background/password2.jpg")
              this.particle=new Particle(window.innerWidth/2,window.innerHeight/2,ctx)
              this.borders.push(new Border(0, 0, this.canvas.width, 0,ctx,"normal"))
              this.borders.push(new Border(0, 0, 0, this.canvas.height,ctx,"normal"))
              this.borders.push(new Border(this.canvas.width, 0, this.canvas.width, this.canvas.height,ctx,"normal"))
              this.borders.push(new Border(0, this.canvas.height, this.canvas.width, this.canvas.height,ctx,"normal"))
              this.color="rgb(255,255,255)"
              this.answer1=false
              
             
        
            
          
            }
            /**
             * Functie om de game te updaten
             */
            public update(mousex:number,mousey:number,elapsed:number){
              this.ctx.clearRect(0, 0, this.room.canvas.width, this.room.canvas.height);
              this.timer(elapsed)
        
              this.particle.update(mousex,mousey,this.borders)
              this.particle.animate();
              this.particle.move();
        
              if(Vector.dist(this.particle.pos,{x:(window.innerWidth / 2) + 150,y:300})<50){
                this.color="rgb(255,0,0)"
                this.answer1=true
              }else if(Vector.dist(this.particle.pos,{x:(window.innerWidth / 2) + 150,y:400})<50){
                this.color="rgb(0,255,0)"
                this.answer1=false
        
              }else if(Vector.dist(this.particle.pos,{x:(window.innerWidth / 2) + 150,y:500})<50){
                this.color="rgb(0,0,255)"
                this.answer1=false
        
              }else if(Vector.dist(this.particle.pos,{x:(window.innerWidth / 2) + 150,y:600})<50){
                this.color="rgb(255,69,0)"
                this.answer1=false
        
              }
        
              if(this.keyboard.isKeyDown(13)){
               
                if(this.answer1){
                  this.complete=true
                  setTimeout(this.answer.bind(this), 4000);
                }else{
                  this.complete=0
                  setTimeout(this.answerWrong.bind(this), 2000);
                  
        
                }
              }else{
                if(this.timeLeft<0){
                  this.complete=5
                  setTimeout(this.answerWrong.bind(this), 2000);
            
                  }
              }
        
            }
        
           
        
            
        
            /**
             * Functie om de minigame te renderen
             */
            public render(){
        
              this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, window.innerWidth, window.innerHeight)
            
        
              this.ctx.strokeStyle = "rgb(255,255,255)"
              this.ctx.fillStyle="rgb(255,255,255)"
              this.ctx.beginPath()
              this.ctx.rect(90, 170, (window.innerWidth / 2) + 400, 500)
              this.ctx.closePath()
              this.ctx.stroke()
              this.ctx.fill()
          
              this.writeTextToCanvas("Wat is het meest gebruikte wachtwoord en daarmee het zwakste wachtwoord?", 20, 100, 200)
              this.writeTextToCanvas("Loop naar het goede antwoord en druk op enter als je het zeker weet", 20, 100, 230)
          
              this.writeTextToCanvas("123456", 20, 100, 300)
              //rood
              this.writeTextToCanvas("A", 20, (window.innerWidth / 2) + 150, 300,"start","red")
          
              this.writeTextToCanvas("abcd", 20, 100, 400)
              //groen
              this.writeTextToCanvas("B", 20, (window.innerWidth / 2) + 150, 400,"start","green")
          
              this.writeTextToCanvas("perenenappels", 20, 100, 500)
              //blauw
              this.writeTextToCanvas("C", 20, (window.innerWidth / 2) + 150, 500,"start","blue")

              this.writeTextToCanvas("hondjes", 20, 100, 600)
              //blauw
              this.writeTextToCanvas("D", 20, (window.innerWidth / 2) + 150, 600,"start","rgb(255,69,0)")
        
        
              this.particle.show(true,this.color)
        
              if (this.complete) {
                this.writeTextToCanvas("Goed gedaan!", 20, 100, window.innerHeight-150)
              } else if (this.complete === 0) {
                this.writeTextToCanvas("Helaas, dit is fout", 30, 100, 900)
          
              }else if (this.complete === 5) {
                this.writeTextToCanvas("Helaas, de tijd is op", 30, 100, 900)
          
              }

               //timer
	             this.renderTime()
                
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
            color: string = 'black',
          ): void {
            this.ctx.font = `bold ${fontSize}px sans-serif`;
            this.ctx.fillStyle = color;
            this.ctx.textAlign = alignment;
            this.ctx.fillText(text, xCoordinate, yCoordinate);
          }
        }
        