import InfoDisplay from "./InformationDisplay";
import Room from "./Room";
import Scene from "./Scene";

export default class Hints extends InfoDisplay{
    public hintsArray: string[];
    private returnHint: string[];
    // private hintFound: string[] = [];
    //private progress: Progress;
    private scene:Scene;
    public  found:any[];
    public test:any;

    public constructor(canvas: HTMLCanvasElement,scene:Scene){
        super(canvas);
        this.hintsArray = this.passwordArray(Room.randomNumber(0,2));
        this.test = this.hintsArray;
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
            this.returnHint.push(this.hintsArray[  this.hintsArray.length-roomNumber].valueOf());
        }
        this.scene.progress.increaseProgress(10);
    }

    public getHint(){
        return this.returnHint;
    }



    public getAnswer(): string[] {
        return this.hintsArray;
    }

    private passwordArray(number: number): string[]{
		if (number === 1) {
            let a = ['r','e','g','e','n','b','o','o','g'];
            console.log(a);
			return a;
		} else if (number === 2) {
            let b = ['b','e','-','s','a','f','e','-','o','n','l','i','n','e'];
            console.log(b);
			return b;
		} else {
            let c = ['s','a','f','e','-','p','a','s','s','w','o','r','d','!'];
            console.log(c);
			return c;
		}
	}
}