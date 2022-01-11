import KeyboardListener from "../KeyboardListener";
import Room from "../Room";

export default class MGMain{
    public roomId:number;
    public room:Room;
    public keyboard:KeyboardListener

    constructor(roomId:number,room:Room){
        this.roomId=roomId
        this.room=room
        this.keyboard=new KeyboardListener()

    }
}