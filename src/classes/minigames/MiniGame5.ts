import Room from "../Room";
import MGMain from "./MGMain";
import Game from "../Game"

export default class MiniGame5 extends MGMain{
    
  /**
   * Create an instance of this object
   * @param ctx canvas rendering context 2D
   * @param room A room
   * @param canvas canvas
   */
    constructor(ctx:CanvasRenderingContext2D,room:Room, canvas: HTMLCanvasElement){
      super(5,room, ctx, canvas)

    }

    /**
   * Functie om de game te updaten
   */
    public update(){

    }

    /**
   * Functie om de minigame te renderen
   */
    public render(){

        this.writeTextToCanvas(`Dit is kamer `+this.roomId,20,200,200)
        
    }
}