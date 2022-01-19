import Room from "./Room.js";
import Scene from "./Scene.js"
export default class Level1map {

    public level1: Array<any>=[];
    public ctx: CanvasRenderingContext2D;
    public widthHall: number;
    public widthCentralHub!: number;
    public heightCentralHub!: number;
    public canvas: HTMLCanvasElement;
    public agentBorders: Array<any>=[];
    public rooms!: Array<any>;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.widthHall = 50;
        this.ctx = ctx;
        this.canvas = canvas;
        this.loadRooms()

        this.level1 = [//side borders
            [0, 0, this.canvas.width, 0],
            [0, 0, 0, this.canvas.height],
            [this.canvas.width, 0, this.canvas.width, this.canvas.height],
            [0, this.canvas.height, this.canvas.width, this.canvas.height],
            //


            [100+this.widthHall, 100, this.canvas.width / 2, 100],
           [100+this.widthHall, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 100 + this.widthHall],

           this.turnUR(100 - this.widthHall,100+2*this.widthHall)[0],
           this.turnUR(100 - this.widthHall,100+2*this.widthHall)[1],
           this.turnUR(100 -this.widthHall,100+2*this.widthHall)[2],
           this.turnUR(100 - this.widthHall,100+2*this.widthHall)[3],
           [0, 100+2*this.widthHall,100 - this.widthHall, 100+2*this.widthHall],

           this.makeHallV(this.widthHall, 100+3*this.widthHall,2*this.widthHall)[0],
            this.makeHallV(this.widthHall, 100+3*this.widthHall,2*this.widthHall)[1],

            this.turnDR(this.widthHall ,100+5*this.widthHall)[0],
            this.turnDR(this.widthHall ,100+5*this.widthHall)[1],
            this.turnDR(this.widthHall ,100+5*this.widthHall)[2],
            this.turnDR(this.widthHall ,100+5*this.widthHall)[3],

            this.makeHallH(3*this.widthHall ,100+6*this.widthHall,2*this.widthHall)[0],
            this.makeHallH(3*this.widthHall ,100+6*this.widthHall,2*this.widthHall)[1],

           

           this.makeHallH(100 ,100+2*this.widthHall,2*this.widthHall)[0],
            this.makeHallH(100 ,100+2*this.widthHall,2*this.widthHall)[1],

            [(this.canvas.width / 2)-13*this.widthHall ,100+6*this.widthHall, (this.canvas.width / 2)-13*this.widthHall ,100+7*this.widthHall],

            this.makeHallH((this.canvas.width / 2)-13*this.widthHall ,100+7*this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)-13*this.widthHall ,100+7*this.widthHall,3*this.widthHall)[1],

            this.turnDR((this.canvas.width / 2)-10*this.widthHall ,100+8*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)-10*this.widthHall ,100+8*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)-10*this.widthHall ,100+8*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)-10*this.widthHall ,100+8*this.widthHall)[3],

            this.turnRD((this.canvas.width / 2)-8*this.widthHall ,100+9*this.widthHall)[0],
            this.turnRD((this.canvas.width / 2)-8*this.widthHall ,100+9*this.widthHall)[1],
            this.turnRD((this.canvas.width / 2)-8*this.widthHall ,100+9*this.widthHall)[2],
            this.turnRD((this.canvas.width / 2)-8*this.widthHall ,100+9*this.widthHall)[3],

            [(this.canvas.width / 2)-6*this.widthHall ,100+10*this.widthHall, (this.canvas.width / 2)-5*this.widthHall ,100+10*this.widthHall],
            [(this.canvas.width / 2)-5*this.widthHall ,100+11*this.widthHall, (this.canvas.width / 2)-5*this.widthHall ,100+12*this.widthHall],

            this.makeHallH((this.canvas.width / 2)-10*this.widthHall ,100+11*this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)-10*this.widthHall ,100+11*this.widthHall,3*this.widthHall)[1],
            [(this.canvas.width / 2)-7*this.widthHall ,100+12*this.widthHall, (this.canvas.width / 2)-7*this.widthHall ,100+13*this.widthHall],
            this.makeRoomDR((this.canvas.width / 2)-10*this.widthHall ,100+13*this.widthHall,2*this.widthHall,3*this.widthHall)[0],
            this.makeRoomDR((this.canvas.width / 2)-10*this.widthHall ,100+13*this.widthHall,2*this.widthHall,3*this.widthHall)[1],
            this.makeRoomDR((this.canvas.width / 2)-10*this.widthHall ,100+13*this.widthHall,2*this.widthHall,3*this.widthHall)[2],
            this.makeRoomDR((this.canvas.width / 2)-10*this.widthHall ,100+13*this.widthHall,2*this.widthHall,3*this.widthHall)[3],
            this.makeRoomDR((this.canvas.width / 2)-10*this.widthHall ,100+13*this.widthHall,2*this.widthHall,3*this.widthHall)[4],

            [(this.canvas.width / 2)-5*this.widthHall ,100+15*this.widthHall, (this.canvas.width / 2)-5*this.widthHall ,100+16*this.widthHall],

             [(this.canvas.width / 2)-10*this.widthHall ,100+17*this.widthHall, (this.canvas.width / 2)-5*this.widthHall ,100+17*this.widthHall],

            
            this.turnDR((this.canvas.width / 2)-13*this.widthHall ,100+15*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)-13*this.widthHall ,100+15*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)-13*this.widthHall ,100+15*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)-13*this.widthHall ,100+15*this.widthHall)[3],
            this.makeHallV((this.canvas.width / 2)-13*this.widthHall, 100+13*this.widthHall,2*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2)-13*this.widthHall, 100+13*this.widthHall,2*this.widthHall)[1],
            [(this.canvas.width / 2)-12*this.widthHall, 100+13*this.widthHall, (this.canvas.width / 2)-10*this.widthHall, 100+13*this.widthHall],
            [(this.canvas.width / 2)-10*this.widthHall, 100+12*this.widthHall, (this.canvas.width / 2)-10*this.widthHall, 100+13*this.widthHall],
            this.makeBlock((this.canvas.width / 2)-15*this.widthHall, 100+10*this.widthHall,4*this.widthHall,2*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)-15*this.widthHall ,100+10*this.widthHall,4*this.widthHall,2*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)-15*this.widthHall ,100+10*this.widthHall,4*this.widthHall,2*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)-15*this.widthHall ,100+10*this.widthHall,4*this.widthHall,2*this.widthHall)[3],

            [(this.canvas.width / 2)-10*this.widthHall, 100+10*this.widthHall, (this.canvas.width / 2)-10*this.widthHall, 100+11*this.widthHall],
            [(this.canvas.width / 2)-14*this.widthHall, 100+13*this.widthHall, (this.canvas.width / 2)-13*this.widthHall, 100+13*this.widthHall],
            this.makeRoomDT((this.canvas.width / 2)-16*this.widthHall, 100+13*this.widthHall,2*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDT((this.canvas.width / 2)-16*this.widthHall, 100+13*this.widthHall,2*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDT((this.canvas.width / 2)-16*this.widthHall, 100+13*this.widthHall,2*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDT((this.canvas.width / 2)-16*this.widthHall, 100+13*this.widthHall,2*this.widthHall,2*this.widthHall)[3],

            this.makeRoomDL((this.canvas.width / 2)-16*this.widthHall, 100+15*this.widthHall,2*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDL((this.canvas.width / 2)-16*this.widthHall, 100+15*this.widthHall,2*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDL((this.canvas.width / 2)-16*this.widthHall, 100+15*this.widthHall,2*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDL((this.canvas.width / 2)-16*this.widthHall, 100+15*this.widthHall,2*this.widthHall,2*this.widthHall)[3],

            this.makeHallH((this.canvas.width / 2)-17*this.widthHall ,100+16*this.widthHall,this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)-17*this.widthHall ,100+16*this.widthHall,this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)-19*this.widthHall ,100+15*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)-19*this.widthHall ,100+15*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)-19*this.widthHall ,100+15*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)-19*this.widthHall ,100+15*this.widthHall)[3],
            this.makeHallV((this.canvas.width / 2)-19*this.widthHall ,100+13*this.widthHall,2*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2)-19*this.widthHall, 100+13*this.widthHall,2*this.widthHall)[1],

            [0, 100+13*this.widthHall, (this.canvas.width / 2)-19*this.widthHall, 100+13*this.widthHall],
            [(this.canvas.width / 2)-18*this.widthHall, 100+13*this.widthHall, (this.canvas.width / 2)-16*this.widthHall, 100+13*this.widthHall],

            this.makeBlock((this.canvas.width / 2)-18*this.widthHall, 100+9*this.widthHall,2*this.widthHall,3*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)-18*this.widthHall ,100+9*this.widthHall,2*this.widthHall,3*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)-18*this.widthHall ,100+9*this.widthHall,2*this.widthHall,3*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)-18*this.widthHall ,100+9*this.widthHall,2*this.widthHall,3*this.widthHall)[3],

            this.turnDR((this.canvas.width / 2)-14*this.widthHall, 100+7*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)-14*this.widthHall ,100+7*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)-14*this.widthHall ,100+7*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)-14*this.widthHall ,100+7*this.widthHall)[3],
            [(this.canvas.width / 2)-14*this.widthHall-20, 100+7*this.widthHall, (this.canvas.width / 2)-14*this.widthHall ,100+7*this.widthHall],
            [(this.canvas.width / 2)-12*this.widthHall ,100+9*this.widthHall, (this.canvas.width / 2)-12*this.widthHall ,100+10*this.widthHall],
           





            this.turnRD((this.canvas.width / 2)-16*this.widthHall ,100+2*this.widthHall)[0],
            this.turnRD((this.canvas.width / 2)-16*this.widthHall ,100+2*this.widthHall)[1],
            this.turnRD((this.canvas.width / 2)-16*this.widthHall ,100+2*this.widthHall)[2],
            this.turnRD((this.canvas.width / 2)-16*this.widthHall ,100+2*this.widthHall)[3],


            [this.canvas.width / 2, 100+this.widthHall, this.canvas.width / 2, 300],

            [(this.canvas.width / 2)-9*this.widthHall, 100+this.widthHall, (this.canvas.width / 2)-9*this.widthHall, 100+2*this.widthHall],
            [(this.canvas.width / 2)-10*this.widthHall, 100+2*this.widthHall, (this.canvas.width / 2)-10*this.widthHall, 100+3*this.widthHall],
            [(this.canvas.width / 2)-12*this.widthHall, 100+2*this.widthHall, (this.canvas.width / 2)-10*this.widthHall, 100+2*this.widthHall],
            [(this.canvas.width / 2)-13*this.widthHall, 100+this.widthHall, (this.canvas.width / 2)-13*this.widthHall, 100+2*this.widthHall],
            this.makeHallV((this.canvas.width / 2)-13*this.widthHall, 100+2*this.widthHall,2*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2)-13*this.widthHall, 100+2*this.widthHall,2*this.widthHall)[1],
            this.makeHallH((this.canvas.width / 2)-13*this.widthHall ,100+5*this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)-13*this.widthHall ,100+5*this.widthHall,3*this.widthHall)[1],

            this.turnDR((this.canvas.width / 2)-15*this.widthHall ,100+3*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)-15*this.widthHall ,100+3*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)-15*this.widthHall ,100+3*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)-15*this.widthHall ,100+3*this.widthHall)[3],






            this.makeHallH((this.canvas.width / 2) ,100,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) ,100,3*this.widthHall)[1],

            this.makeRoomDR((this.canvas.width / 2)+this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDR((this.canvas.width / 2)+this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDR((this.canvas.width / 2)+this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDR((this.canvas.width / 2)+this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[3],

            [(this.canvas.width / 2)+4*this.widthHall, 100+3*this.widthHall, (this.canvas.width / 2)+4*this.widthHall, 100+4*this.widthHall],

            this.turnRD((this.canvas.width / 2) + 3 * this.widthHall,100 )[0],
            this.turnRD((this.canvas.width / 2) + 3 * this.widthHall,100 )[1],
            this.turnRD((this.canvas.width / 2) + 3 * this.widthHall,100 )[2],
            this.turnRD((this.canvas.width / 2) + 3 * this.widthHall,100 )[3],


            this.turnUR((this.canvas.width / 2) + 5 * this.widthHall,100+5*this.widthHall)[0],
            this.turnUR((this.canvas.width / 2) + 5 * this.widthHall,100+5*this.widthHall)[1],
            this.turnUR((this.canvas.width / 2) + 5 * this.widthHall,100+5*this.widthHall)[2],
            this.turnUR((this.canvas.width / 2) + 5 * this.widthHall,100+5*this.widthHall)[3],

            this.makeHallV((this.canvas.width / 2) + 7 * this.widthHall,100+1*this.widthHall,2*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) + 7 * this.widthHall,100+1*this.widthHall,2*this.widthHall)[1],

            [(this.canvas.width / 2)+5*this.widthHall, 100, (this.canvas.width / 2)+6*this.widthHall, 100],
            this.turnRD((this.canvas.width / 2) + 6 * this.widthHall,100 )[0],
            this.turnRD((this.canvas.width / 2) + 6 * this.widthHall,100 )[1],
            this.turnRD((this.canvas.width / 2) + 6 * this.widthHall,100 )[2],
            this.turnRD((this.canvas.width / 2) + 6 * this.widthHall,100 )[3],

            [(this.canvas.width / 2)+8*this.widthHall, 100, this.canvas.width, 100],

            this.makeRoomDT((this.canvas.width / 2)+9*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDT((this.canvas.width / 2)+9*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDT((this.canvas.width / 2)+9*this.widthHall ,100+ this.widthHall,2*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDT((this.canvas.width / 2)+9*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[3],

            this.makeBlock((this.canvas.width / 2)+12*this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)+12*this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)+12*this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)+12*this.widthHall ,100+this.widthHall,3*this.widthHall,2*this.widthHall)[3],

            this.makeBlock((this.canvas.width / 2)+16*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)+16*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)+16*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)+16*this.widthHall ,100+this.widthHall,2*this.widthHall,2*this.widthHall)[3],

            this.makeHallH((this.canvas.width / 2) + 13 * this.widthHall,100+4*this.widthHall,this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) + 13* this.widthHall,100+4*this.widthHall,this.widthHall)[1],

            this.turnRU((this.canvas.width / 2) + 14 * this.widthHall,100+4*this.widthHall)[0],
            this.turnRU((this.canvas.width / 2) + 14 * this.widthHall,100+4*this.widthHall)[1],
            this.turnRU((this.canvas.width / 2) + 14 * this.widthHall,100+4*this.widthHall)[2],
            this.turnRU((this.canvas.width / 2) + 14 * this.widthHall,100+4*this.widthHall)[3],

            [(this.canvas.width / 2) + 16 * this.widthHall,100+5*this.widthHall, (this.canvas.width / 2) + 16 * this.widthHall,100+6*this.widthHall],



            this.makeHallH((this.canvas.width / 2) + 8 * this.widthHall,100+3*this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) + 8 * this.widthHall,100+3*this.widthHall,3*this.widthHall)[1],

            [(this.canvas.width / 2) - this.widthHall, 100 + this.widthHall, (this.canvas.width / 2) - this.widthHall, 300],

            [(this.canvas.width / 2) - 2 * this.widthHall, 300, (this.canvas.width / 2) - this.widthHall, 300],
            [(this.canvas.width / 2) - 3 * this.widthHall, 200+this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 2 * this.widthHall, 200+this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall, 300],

            
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall,100 + 2*this.widthHall)[0],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall,100 +2*this.widthHall)[1],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall,100 +2*this.widthHall)[2],
            this.turnRD((this.canvas.width / 2) - 4 * this.widthHall,100 +2*this.widthHall)[3],
            this.makeHallH((this.canvas.width / 2) - 9 * this.widthHall,100 + 2*this.widthHall,5*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) - 9 * this.widthHall,100 + 2*this.widthHall,5*this.widthHall)[1],

            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall,100 + 3*this.widthHall,2*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall,100 + 3*this.widthHall,2*this.widthHall)[1],

            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall,100 + 6*this.widthHall,this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) - 10 * this.widthHall,100 + 6*this.widthHall,this.widthHall)[1],

            [(this.canvas.width / 2) - 9 * this.widthHall,100 + 4*this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 100 + 4*this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall,100 + 6*this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 100 + 6*this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall, 100 + 4*this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall, 100 + 6*this.widthHall],

            //central hub
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) , 300 + this.widthHall],
            [(this.canvas.width / 2) +  this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) - 4 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) - 4 * this.widthHall, 300 + 5 * this.widthHall],
            [(this.canvas.width / 2) + 3 * this.widthHall, 300 + this.widthHall, (this.canvas.width / 2) + 3 * this.widthHall, 300 + 5 * this.widthHall],

            [this.canvas.width / 2, 300, (this.canvas.width / 2)+4*this.widthHall,300],
            //rechts van hub
            [(this.canvas.width / 2)+4*this.widthHall,300, (this.canvas.width / 2)+4*this.widthHall,300+5 * this.widthHall],
            //links van hub
            [(this.canvas.width / 2) - 5 * this.widthHall, 300, (this.canvas.width / 2) - 3 * this.widthHall, 300],
            [(this.canvas.width / 2) - 5 * this.widthHall,300, (this.canvas.width / 2) - 5 * this.widthHall,300+3 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall,300+3 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall,300+3 * this.widthHall],
            [(this.canvas.width / 2) - 9 * this.widthHall,300+4 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall,300+4 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall,300+4 * this.widthHall, (this.canvas.width / 2) - 5 * this.widthHall,300+6 * this.widthHall],

            [(this.canvas.width / 2) - 5 * this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+6 * this.widthHall],
            [(this.canvas.width / 2) - 2 * this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+8 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall,300+8 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+8 * this.widthHall],
            [(this.canvas.width / 2) - 5 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 2 * this.widthHall,300+9 * this.widthHall],
            [(this.canvas.width / 2) - 8 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 6 * this.widthHall,300+9 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 7 * this.widthHall,300+11 * this.widthHall],
            [(this.canvas.width / 2) - 3 * this.widthHall,300+9 * this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall,300+11 * this.widthHall],
            [(this.canvas.width / 2) - 7 * this.widthHall,300+11 * this.widthHall, (this.canvas.width / 2) - 3 * this.widthHall,300+11 * this.widthHall],

            [(this.canvas.width / 2) -   this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) -  this.widthHall,300+8 * this.widthHall],
            [(this.canvas.width / 2) -   this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) +4* this.widthHall,300+6 * this.widthHall],
            [(this.canvas.width / 2) +4* this.widthHall,300+6 * this.widthHall, (this.canvas.width / 2) +4* this.widthHall,300+8 * this.widthHall],

            this.makeHallH((this.canvas.width / 2) -   this.widthHall,300+8 * this.widthHall,5*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) -  this.widthHall,300+8 * this.widthHall,5*this.widthHall)[1],

            this.makeHallV((this.canvas.width / 2) -   2*this.widthHall,300+9 * this.widthHall,3*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2) -   2*this.widthHall,300+9 * this.widthHall,3*this.widthHall)[1],

            this.makeHallH((this.canvas.width / 2) -   5*this.widthHall,300+12 * this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) -  5*this.widthHall,300+12 * this.widthHall,3*this.widthHall)[1],


            //
            this.makeBlock((this.canvas.width / 2)+5*this.widthHall ,300+6*this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)+5*this.widthHall ,300+6*this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)+5*this.widthHall ,300+6*this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)+5*this.widthHall ,300+6*this.widthHall,3*this.widthHall,2*this.widthHall)[3],

            this.makeRoomDR((this.canvas.width / 2)+9*this.widthHall ,300+8*this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDR((this.canvas.width / 2)+9*this.widthHall ,300+8*this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDR((this.canvas.width / 2)+9*this.widthHall ,300+8*this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDR((this.canvas.width / 2)+9*this.widthHall ,300+8*this.widthHall,3*this.widthHall,2*this.widthHall)[3],

            this.makeBlock((this.canvas.width / 2)+13*this.widthHall ,300+8*this.widthHall,2*this.widthHall,2*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)+13*this.widthHall ,300+8*this.widthHall,2*this.widthHall,2*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)+13*this.widthHall ,300+8*this.widthHall,2*this.widthHall,2*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)+13*this.widthHall ,300+8*this.widthHall,2*this.widthHall,2*this.widthHall)[3],

            [(this.canvas.width / 2)+14*this.widthHall ,300+11*this.widthHall, (this.canvas.width / 2)+15*this.widthHall ,300+11*this.widthHall],
            // this.makeHallV((this.canvas.width / 2) +   15*this.widthHall,300+11 * this.widthHall,this.widthHall)[0],
            // this.makeHallV((this.canvas.width / 2) +   15*this.widthHall,300+11 * this.widthHall,this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)+15*this.widthHall ,300+11*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)+15*this.widthHall ,300+11*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)+15*this.widthHall ,300+11*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)+15*this.widthHall ,300+11*this.widthHall)[3],

            this.turnRU((this.canvas.width / 2)+17*this.widthHall ,300+12*this.widthHall)[0],
            this.turnRU((this.canvas.width / 2)+17*this.widthHall ,300+12*this.widthHall)[1],
            this.turnRU((this.canvas.width / 2)+17*this.widthHall ,300+12*this.widthHall)[2],
            this.turnRU((this.canvas.width / 2)+17*this.widthHall ,300+12*this.widthHall)[3],

            [(this.canvas.width / 2) +  19*this.widthHall,300+11 * this.widthHall,this.canvas.width,300+11 * this.widthHall],


            this.makeRoomDT((this.canvas.width / 2)+16*this.widthHall ,300+6 * this.widthHall,2*this.widthHall,4*this.widthHall)[0],
            this.makeRoomDT((this.canvas.width / 2)+16*this.widthHall ,300+6 * this.widthHall,2*this.widthHall,4*this.widthHall)[1],
            this.makeRoomDT((this.canvas.width / 2)+16*this.widthHall ,300+6 * this.widthHall,2*this.widthHall,4*this.widthHall)[2],
            this.makeRoomDT((this.canvas.width / 2)+16*this.widthHall ,300+6*this.widthHall,2*this.widthHall,4*this.widthHall)[3],
            


            //bottom
            this.makeHallH((this.canvas.width / 2) -  this.widthHall,300+12 * this.widthHall,1*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2) -  this.widthHall,300+12 * this.widthHall,1*this.widthHall)[1],
            [(this.canvas.width / 2) -  2*this.widthHall,300+13 * this.widthHall,(this.canvas.width / 2) -  this.widthHall,300+13 * this.widthHall],

            this.turnRU((this.canvas.width / 2) ,300+12 * this.widthHall)[0],
            this.turnRU((this.canvas.width / 2) ,300+12 * this.widthHall)[1],
            this.turnRU((this.canvas.width / 2) ,300+12 * this.widthHall)[2],
            this.turnRU((this.canvas.width / 2) ,300+12 * this.widthHall)[3],

            this.turnUR((this.canvas.width / 2)+this.widthHall ,300+12 * this.widthHall)[0],
            this.turnUR((this.canvas.width / 2) +this.widthHall,300+12 * this.widthHall)[1],
            this.turnUR((this.canvas.width / 2) +this.widthHall,300+12 * this.widthHall)[2],
            this.turnUR((this.canvas.width / 2) +this.widthHall,300+12 * this.widthHall)[3],

            this.makeHallH((this.canvas.width / 2)+3*this.widthHall ,300+10 * this.widthHall,1*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+3*this.widthHall ,300+10 * this.widthHall,1*this.widthHall)[1],
            [(this.canvas.width / 2)+4*this.widthHall ,300+11 * this.widthHall, (this.canvas.width / 2)+4*this.widthHall ,300+12 * this.widthHall],
            [(this.canvas.width / 2)+2*this.widthHall ,300+13 * this.widthHall, (this.canvas.width / 2)+4*this.widthHall ,300+13 * this.widthHall],
             [(this.canvas.width / 2)+4*this.widthHall ,300+13 * this.widthHall, (this.canvas.width / 2)+5*this.widthHall ,300+13 * this.widthHall],
            this.makeHallH((this.canvas.width / 2)+5*this.widthHall ,300+10 * this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+5*this.widthHall ,300+10 * this.widthHall,3*this.widthHall)[1],
            [(this.canvas.width / 2)+5*this.widthHall ,300+11 * this.widthHall, (this.canvas.width / 2)+5*this.widthHall ,300+12 * this.widthHall],
            [(this.canvas.width / 2)+4*this.widthHall ,300+9 * this.widthHall, (this.canvas.width / 2)+4*this.widthHall ,300+10 * this.widthHall],


           

            this.makeHallH((this.canvas.width / 2)+8*this.widthHall ,300+11 * this.widthHall,this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+8*this.widthHall ,300+11 * this.widthHall,this.widthHall)[1],

            this.turnRU((this.canvas.width / 2)+8*this.widthHall ,300+12 * this.widthHall)[0],
            this.turnRU((this.canvas.width / 2)+8*this.widthHall ,300+12 * this.widthHall)[1],
            this.turnRU((this.canvas.width / 2)+8*this.widthHall ,300+12 * this.widthHall)[2],
            this.turnRU((this.canvas.width / 2)+8*this.widthHall ,300+12 * this.widthHall)[3],

            
           [(this.canvas.width / 2)+10*this.widthHall ,300+11 * this.widthHall, (this.canvas.width / 2)+11*this.widthHall ,300+11 * this.widthHall],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+11 * this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+11 * this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+11 * this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+11*this.widthHall,3*this.widthHall,2*this.widthHall)[3],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+11*this.widthHall,3*this.widthHall,2*this.widthHall)[4],

            this.turnDR((this.canvas.width / 2)+9*this.widthHall ,300+5*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)+9*this.widthHall ,300+5*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)+9*this.widthHall ,300+5*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)+9*this.widthHall ,300+5*this.widthHall)[3],

            this.turnRU((this.canvas.width / 2)+13*this.widthHall ,300+6*this.widthHall)[0],
            this.turnRU((this.canvas.width / 2)+13*this.widthHall ,300+6*this.widthHall)[1],
            this.turnRU((this.canvas.width / 2)+13*this.widthHall ,300+6*this.widthHall)[2],
            this.turnRU((this.canvas.width / 2)+13*this.widthHall ,300+6*this.widthHall)[3],

            this.turnRD((this.canvas.width / 2)+8*this.widthHall ,300+4*this.widthHall)[0],
            this.turnRD((this.canvas.width / 2)+8*this.widthHall ,300+4*this.widthHall)[1],
            this.turnRD((this.canvas.width / 2)+8*this.widthHall ,300+4*this.widthHall)[2],
            this.turnRD((this.canvas.width / 2)+8*this.widthHall ,300+4*this.widthHall)[3],

            this.makeHallH((this.canvas.width / 2)+7*this.widthHall ,300+4*this.widthHall,this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+7*this.widthHall ,300+4*this.widthHall,this.widthHall)[1],

            this.turnDR((this.canvas.width / 2)+5*this.widthHall ,300+3*this.widthHall)[0],
            this.turnDR((this.canvas.width / 2)+5*this.widthHall ,300+3*this.widthHall)[1],
            this.turnDR((this.canvas.width / 2)+5*this.widthHall ,300+3*this.widthHall)[2],
            this.turnDR((this.canvas.width / 2)+5*this.widthHall ,300+3*this.widthHall)[3],

            this.makeHallV((this.canvas.width / 2)+5*this.widthHall ,300+1*this.widthHall,this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2)+5*this.widthHall ,300+1*this.widthHall,this.widthHall)[1],
            [(this.canvas.width / 2)+5*this.widthHall ,300+2*this.widthHall, (this.canvas.width / 2)+5*this.widthHall ,300+3*this.widthHall],
            this.makeHallH((this.canvas.width / 2)+6*this.widthHall ,300+2*this.widthHall,5*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+6*this.widthHall ,300+2*this.widthHall,5*this.widthHall)[1],

            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+3 * this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[3],
            this.makeRoomDT((this.canvas.width / 2)+11*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[4],


            this.makeHallH((this.canvas.width / 2)+11*this.widthHall ,300+6*this.widthHall,3*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+11*this.widthHall ,300+6*this.widthHall,3*this.widthHall)[1],




            this.turnUR((this.canvas.width / 2)+11*this.widthHall ,300+2*this.widthHall)[0],
            this.turnUR((this.canvas.width / 2)+11*this.widthHall ,300+2*this.widthHall)[1],
            this.turnUR((this.canvas.width / 2)+11*this.widthHall ,300+2*this.widthHall)[2],
            this.turnUR((this.canvas.width / 2)+11*this.widthHall ,300+2*this.widthHall)[3],

            [(this.canvas.width / 2)+12*this.widthHall ,300+2*this.widthHall, this.canvas.width ,300+2*this.widthHall],

            this.makeBlock((this.canvas.width / 2)+15*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[0],
            this.makeBlock((this.canvas.width / 2)+15*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[1],
            this.makeBlock((this.canvas.width / 2)+15*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[2],
            this.makeBlock((this.canvas.width / 2)+15*this.widthHall ,300+3*this.widthHall,3*this.widthHall,2*this.widthHall)[3],


            [(this.canvas.width / 2)+16*this.widthHall ,300+11*this.widthHall, (this.canvas.width/2)+18*this.widthHall ,300+11*this.widthHall],

            [(this.canvas.width / 2)+5*this.widthHall ,300+9*this.widthHall, (this.canvas.width/2)+8*this.widthHall ,300+9*this.widthHall],

            [(this.canvas.width / 2)+5*this.widthHall ,300+9*this.widthHall, (this.canvas.width/2)+5*this.widthHall ,300+10*this.widthHall],
            [(this.canvas.width / 2)+8*this.widthHall ,300+9*this.widthHall, (this.canvas.width/2)+8*this.widthHall ,300+10*this.widthHall],


            //wall rechts voor prison room
            [(this.canvas.width/2)+18*this.widthHall,100+3*this.widthHall,this.canvas.width,100+3*this.widthHall],

            //gangdown left
            [(this.canvas.width / 2)-11*this.widthHall ,100+16*this.widthHall,(this.canvas.width / 2)-10*this.widthHall ,100+16*this.widthHall],
            this.makeHallV((this.canvas.width / 2)-11*this.widthHall ,100+17*this.widthHall,3*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2)-11*this.widthHall ,100+17*this.widthHall,3*this.widthHall)[1],

            //gangdown right
             this.makeHallH((this.canvas.width / 2)+5*this.widthHall ,300+12 * this.widthHall,2*this.widthHall)[0],
            this.makeHallH((this.canvas.width / 2)+5*this.widthHall ,300+12 * this.widthHall,2*this.widthHall)[1],
            [(this.canvas.width / 2)+7*this.widthHall ,300+12 * this.widthHall,(this.canvas.width / 2)+8*this.widthHall ,300+12 * this.widthHall],
            this.makeHallV((this.canvas.width / 2)+7*this.widthHall ,300+13 * this.widthHall,2*this.widthHall)[0],
            this.makeHallV((this.canvas.width / 2)+7*this.widthHall ,300+13 * this.widthHall,2*this.widthHall)[1],








            
            

        ]
    
        this.loadAgentBoard()
    }

    public makeHallH(x:number,y:number,w:number){
        let l1=[x,y,x+w,y];
        let l2=[x,y+this.widthHall,x+w,y+this.widthHall]
        return [l1,l2]

    }
    public makeHallV(x:number,y:number,h:number){
        let l1=[x,y,x,y+h];
        let l2=[x+this.widthHall,y,x+this.widthHall,y+h]
        return [l1,l2]

    }

    public makeBlock(x:number,y:number,w:number,h:number){
        let l1=[x,y,x,y+h];
        let l2=[x,y,x+w,y];
        let l3=[x+w,y,x+w,y+h];
        let l4=[x,y+h,x+w,y+h]
        return [l1,l2,l3,l4]

    }

    /**
     * room with door right under
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @returns 
     */
    public makeRoomDR(x:number,y:number,w:number,h:number){
        let l1=[x,y,x,y+h];
        let l2=[x,y,x+w,y];
        let l4=[x,y+h,x+w,y+h];
        let l3;
        let l5=null
        if(h%(3*this.widthHall)===0){
             l3=[x+w,y,x+w,y+this.widthHall];
             l5=[x+w,y+2*this.widthHall,x+w,y+h];
        }else{
        l3=[x+w,y,x+w,y+h-this.widthHall];
        }
        if(l5!=null){
            return [l1,l2,l3,l4,l5]
        }else{
        return [l1,l2,l3,l4]
        }

    }

    /**
     * room with door left
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @returns 
     */
     public makeRoomDL(x:number,y:number,w:number,h:number){
        let l1=[x,y,x+w,y];
        let l2=[x+w,y,x+w,y+h];
        let l4=[x,y+h,x+w,y+h];
        let l3;
        let l5=null
        if(h%(3*this.widthHall)===0){
             l3=[x,y,x,y+this.widthHall];
             l5=[x+2*this.widthHall,y,x+w,y];
        }else{
        l3=[x,y,x,y+this.widthHall];
        }
        if(l5!=null){
            return [l1,l2,l3,l4,l5]
        }else{
        return [l1,l2,l3,l4]
        }

    }

    /**
     * room with door top
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @returns 
     */
     public makeRoomDT(x:number,y:number,w:number,h:number){
        let l1=[x,y,x,y+h];
        let l2
        let l3=[x+w,y,x+w,y+h];
        let l4=[x,y+h,x+w,y+h];
        let l5=null

        if(w%(3*this.widthHall)===0){
            l2=[x,y,x+this.widthHall,y];
            l5=[x+2*this.widthHall,y,x+w,y]

        }else{
            l2=[x,y,x+this.widthHall,y];
        }
        if(l5!=null){
            return [l1,l2,l3,l4,l5]
        }else{
            return [l1,l2,l3,l4]
        }
        

    }
    public turnRD(x:number,y:number){
        let l1=[x,y,x+2*this.widthHall,y];
        let l2=[x,y+this.widthHall,x+this.widthHall,y+this.widthHall]
        let l3=[x+this.widthHall,y+this.widthHall,x+this.widthHall,y+2*this.widthHall]
        let l4=[x+2*this.widthHall,y,x+2*this.widthHall,y+2*this.widthHall]
        return [l1,l2,l3,l4]

    }



    public turnUR(x:number,y:number){
        let l1=[x,y,x,y-2*this.widthHall];
        let l2=[x,y-2*this.widthHall,x+2*this.widthHall,y-2*this.widthHall]
        let l3=[x+this.widthHall,y-this.widthHall,x+2*this.widthHall,y-this.widthHall]
        let l4=[x+this.widthHall,y,x+this.widthHall,y-this.widthHall]
        return [l1,l2,l3,l4]

    }

    public turnDR(x:number,y:number){
        let l1=[x,y,x,y+2*this.widthHall];
        let l2=[x,y+2*this.widthHall,x+2*this.widthHall,y+2*this.widthHall]
        let l3=[x+this.widthHall,y,x+this.widthHall,y+this.widthHall]
        let l4=[x+this.widthHall,y+this.widthHall,x+2*this.widthHall,y+this.widthHall]
        return [l1,l2,l3,l4]

    }

    public turnRU(x:number,y:number){
        let l1=[x,y,x+this.widthHall,y];
        let l2=[x,y+this.widthHall,x+2*this.widthHall,y+this.widthHall]
        let l3=[x+this.widthHall,y,x+this.widthHall,y-this.widthHall]
        let l4=[x+2*this.widthHall,y+this.widthHall,x+2*this.widthHall,y-1*this.widthHall]
        return [l1,l2,l3,l4]

    }

    public turnLD(x:number,y:number){
        let l1=[x,y,x-2*this.widthHall,y];
        let l2=[x,y+this.widthHall,x-this.widthHall,y+this.widthHall]
        let l3=[x-this.widthHall,y+this.widthHall,x-this.widthHall,y+2*this.widthHall]
        let l4=[x-2*this.widthHall,y,x-2*this.widthHall,y+2*this.widthHall]
        return [l1,l2,l3,l4]

    }
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


      public loadAgentBoard(){
          this.agentBorders=[
             [(this.canvas.width/2)-9*this.widthHall,100+5*this.widthHall,(this.canvas.width/2)-9*this.widthHall,100+6*this.widthHall,"door"],
             [(this.canvas.width/2)-12*this.widthHall,100+4*this.widthHall,(this.canvas.width/2)-12*this.widthHall,100+5*this.widthHall,"door"],
              [(this.canvas.width/2)-14*this.widthHall-10,100+5*this.widthHall,(this.canvas.width/2)-14*this.widthHall-10,100+6*this.widthHall,"door"],
              [(this.canvas.width/2)-15*this.widthHall,100+13*this.widthHall,(this.canvas.width/2)-14*this.widthHall,100+13*this.widthHall,"door"],
              [(this.canvas.width/2)-6*this.widthHall,100+13*this.widthHall,(this.canvas.width/2)-5*this.widthHall,100+13*this.widthHall,"door"],
              [(this.canvas.width/2)-8*this.widthHall,100+14*this.widthHall,(this.canvas.width/2)-8*this.widthHall,100+15*this.widthHall,"door"],
              [(this.canvas.width/2)-6*this.widthHall,100+11*this.widthHall,(this.canvas.width/2)-5*this.widthHall,100+11*this.widthHall,"door"],
              [(this.canvas.width/2)+4*this.widthHall,100+16*this.widthHall,(this.canvas.width/2)+4*this.widthHall,100+17*this.widthHall,"door"],
              [(this.canvas.width/2)+12*this.widthHall,100+15*this.widthHall,(this.canvas.width/2)+13*this.widthHall,100+15*this.widthHall,"door"],
              [(this.canvas.width/2)+12*this.widthHall,100+13*this.widthHall,(this.canvas.width/2)+12*this.widthHall,100+14*this.widthHall,"door"],
              [(this.canvas.width/2)+17*this.widthHall,100+10*this.widthHall,(this.canvas.width/2)+18*this.widthHall,100+10*this.widthHall,"door"],
              [(this.canvas.width/2)+12*this.widthHall,100+7*this.widthHall,(this.canvas.width/2)+13*this.widthHall,100+7*this.widthHall,"door"],
              [(this.canvas.width/2)+10*this.widthHall,100+this.widthHall,(this.canvas.width/2)+11*this.widthHall,100+this.widthHall,"door"],
              [(this.canvas.width/2)+7*this.widthHall,100+4*this.widthHall,(this.canvas.width/2)+8*this.widthHall,100+4*this.widthHall,"door"],
              [(this.canvas.width/2)+4*this.widthHall,100+2*this.widthHall,(this.canvas.width/2)+4*this.widthHall,100+3*this.widthHall,"door"],
              [(this.canvas.width/2),100+5*this.widthHall,(this.canvas.width/2)+this.widthHall,100+5*this.widthHall,"door"],
              [(this.canvas.width/2)-19*this.widthHall,100+13*this.widthHall,(this.canvas.width/2)-18*this.widthHall,100+13*this.widthHall,"nodoor"],
              [(this.canvas.width/2)-10*this.widthHall,100+7*this.widthHall,(this.canvas.width/2)-10*this.widthHall,100+8*this.widthHall,"nodoor"],

              [(this.canvas.width/2)-14*this.widthHall,100+9*this.widthHall,(this.canvas.width/2)-14*this.widthHall,100+10*this.widthHall,"nodoor"],
              [(this.canvas.width/2)+11*this.widthHall,100,(this.canvas.width/2)+11*this.widthHall,100+this.widthHall,"nodoor"],
              [(this.canvas.width/2)-8*this.widthHall,100+15*this.widthHall,(this.canvas.width/2)-7*this.widthHall,100+15*this.widthHall,"nodoor"],
              [(this.canvas.width/2)+12*this.widthHall,100+3*this.widthHall,(this.canvas.width/2)+12*this.widthHall,100+4*this.widthHall,"nodoor"],

              [(this.canvas.width/2)+16*this.widthHall,100,(this.canvas.width/2)+16*this.widthHall,100+this.widthHall,"nodoor"],

              


             
          ]
      }


      private loadRooms(){
          this.rooms=[
            [100+3*this.widthHall-10,100+5*this.widthHall+20,"0"],
              [100+5*this.widthHall+20,100+4*this.widthHall+20,"1"],
              [100+8*this.widthHall+20,100+5*this.widthHall+20,"2"],
              [100+11*this.widthHall+30,100+10*this.widthHall+40,"3"],
              [100+11*this.widthHall+30,100+13*this.widthHall+20,"4"],
              [100+3*this.widthHall-10,100+13*this.widthHall+15,"5"],
              [100+9*this.widthHall,100+14*this.widthHall+20,"6"],
              [100+21*this.widthHall,100+16*this.widthHall+20,"7"],
              [(this.canvas.width/2)+12*this.widthHall+25,100+15*this.widthHall+10,"8"],
              [(this.canvas.width/2)+12*this.widthHall-10,100+13*this.widthHall+20,"9"],
              [(this.canvas.width/2)+18*this.widthHall-20,100+10*this.widthHall+15,"10"],
              [(this.canvas.width/2)+12*this.widthHall+20,100+7*this.widthHall+15,"11"],
              [(this.canvas.width/2)+8*this.widthHall-20,100+4*this.widthHall+15,"12"],
              [(this.canvas.width/2)+11*this.widthHall-20,100+this.widthHall+15,"13"],
              [(this.canvas.width/2)+4*this.widthHall-15,100+3*this.widthHall-25,"14"],
              [(this.canvas.width/2)-this.widthHall+25,100+6*this.widthHall+35,"100"],
              [(this.canvas.width/2)+18*this.widthHall,100+5*this.widthHall,"80"],
              [(this.canvas.width/2)-15.5*this.widthHall,300+12.5*this.widthHall,"90"]
              
          ]
      }

      public showRoomIds(room:Room){
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i][2] != "100"&&room.visitedRooms[+this.rooms[i][2]]!=true&&room.timeoutRooms[i][1]!=true) {
              this.ctx.lineWidth = 1;
              this.ctx.fillStyle = "rgb(255,0,0)";
              this.ctx.beginPath();
              this.ctx.arc(
                this.rooms[i][0],
                this.rooms[i][1],
                10,
                0,
                2 * Math.PI
              );
              this.ctx.stroke();
              this.ctx.closePath();
              this.ctx.fill();
              if(this.rooms[i][2]==="90"){
                this.writeTextToCanvas(
                  "Shop",
                  20,
                  this.rooms[i][0],
                  this.rooms[i][1] - 20
                );
              }else{
                this.writeTextToCanvas(
                  this.rooms[i][2],
                  20,
                  this.rooms[i][0],
                  this.rooms[i][1] - 20
                );
              }
              
            }
          }
          
      }

}
