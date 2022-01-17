import InfoDisplay from "./InformationDisplay";
import Room from "./Room";
import Scene from "./Scene";

export default class Hints extends InfoDisplay{
    private  hintsArray: string[];
    private returnHint: string[];
    // private hintFound: string[] = [];
    //private progress: Progress;
    private scene:Scene;
    public  found:any[];

    public constructor(canvas: HTMLCanvasElement,scene:Scene){
        super(canvas);
        this.hintsArray=[] ;
        this.passwordArray(Room.randomNumber(0,2));
        this.returnHint = [];
        this.scene=scene;
        this.found = [];
        this.fillFoundArray();
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

    public fillFoundArray() {
        this.hintsArray.forEach((value: string) => {
            if (value === '-') {
                this.found.push('-');
            } else {
                this.found.push(null);
            }
        });
    }

    public foundHintInScene(roomNumber: number) {
        if (roomNumber >= 0&&roomNumber<=12) {
            this.returnHint.push(this.hintsArray[ 12-roomNumber].valueOf());
        }
        this.scene.progress.increaseProgress(10);
    }

    public getHint(){
        return this.returnHint;
    }

    public getAnswer() {
        return this.hintsArray;
    }

    private passwordArray(number: number): void{
		if (number === 1) {
            let a = ['r','e','g','e','n','b','o','o','g'];
			this.hintsArray=a
		} else if (number === 2) {
            let b = ['b','e','-','s','a','f','e','-','o','n','l','i','n','e'];
			this.hintsArray=b
		} else {
            let c = ['s','a','f','e','-','p','a','s','s','w','o','r','d','!'];
			this.hintsArray=c
		}
	}
}