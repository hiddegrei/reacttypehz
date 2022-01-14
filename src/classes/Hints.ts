import InfoDisplay from "./InformationDisplay";
import Progress from "./Progress";
import Scene from "./Scene";

export default class Hints extends InfoDisplay{
    private hintsArray: string[];
    private returnHint: string[];
    // private hintFound: string[] = [];
    //private progress: Progress;
    private scene:Scene

    public constructor(canvas: HTMLCanvasElement,scene:Scene){
        super(canvas);
        this.hintsArray = ['R','e','g','e','n','b','o','o','g','!'];
        this.returnHint = [];
        this.scene=scene
        console.log(this.hintsArray);
       // this.progress = Scene.getProgress()
    }

    // public foundHint(hint: string) {
    //     this.hintFound = [];
    //     this.hintsArray.forEach((value: string) => {
    //         if (value === hint) {
    //             this.hintFound.push(value);
    //             this.returnHint.push(value);
    //             this.scene.progress.increaseProgress(10);
    //         }
    //     });
    //     return this.hintFound;
    // }

    public foundHintInScene(roomNumber: number) {
        if (roomNumber >= 0&&roomNumber<=9) {
            this.returnHint.push(this.hintsArray[ 9-roomNumber].valueOf());
        }
        this.scene.progress.increaseProgress(10);
    }

    public getHint(){
        return this.returnHint;
    }

    public getAnswer() {
        return this.hintsArray;
    }
}