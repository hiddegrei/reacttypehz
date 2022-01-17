import InfoDisplay from "./InformationDisplay";
import Room from "./Room";
import Scene from "./Scene";

export default class Hints extends InfoDisplay{
    private static hintsArray: string[];
    private returnHint: string[];
    // private hintFound: string[] = [];
    //private progress: Progress;
    private scene:Scene;
    public static found:any[];

    public constructor(canvas: HTMLCanvasElement,scene:Scene){
        super(canvas);
        Hints.hintsArray = this.passwordArray(Room.randomNumber(0,2));
        this.returnHint = [];
        this.scene=scene;
        Hints.found = [];
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
        Hints.hintsArray.forEach((value: string) => {
            if (value === '-') {
                Hints.found.push('-');
            } else {
                Hints.found.push(null);
            }
        });
    }

    public foundHintInScene(roomNumber: number) {
        if (roomNumber >= 0&&roomNumber<=12) {
            this.returnHint.push(Hints.hintsArray[ 12-roomNumber].valueOf());
        }
        this.scene.progress.increaseProgress(10);
    }

    public getHint(){
        return this.returnHint;
    }

    public static getAnswer() {
        return this.hintsArray;
    }

    public passwordArray(number: number): string[] {
		if (number === 1) {
            let a = ['r','e','g','e','n','b','o','o','g'];
			return a;
		} else if (number === 2) {
            let b = ['b','e','-','s','a','f','e','-','o','n','l','i','n','e'];
			return b;
		} else {
            let c = ['s','a','f','e','-','p','a','s','s','w','o','r','d','!'];
			return c;
		}
	}
}