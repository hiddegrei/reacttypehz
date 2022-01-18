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
    private hintsGiven:boolean[]

    public constructor(canvas: HTMLCanvasElement,scene:Scene){
        super(canvas);
        this.hintsArray = this.passwordArray(Room.randomNumber(0,4));
        this.test = this.hintsArray;
        this.returnHint = [];
        this.scene=scene;
        this.found = [];
        this.fillFoundArray();
        this.hintsGiven=[]
        for(let i=0;i<this.hintsArray.length;i++){
            this.hintsGiven[i]=false
        }
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
        // if (roomNumber >= 0&&roomNumber<=this.hintsArray.length-1) {
        //     this.returnHint.push(this.hintsArray[  this.hintsArray.length-1-roomNumber].valueOf());
        // }
        let ranNum:number
        let gotit=false
        
       while(!gotit){
            ranNum=Room.randomNumber(0,this.hintsArray.length-1)
            if(!this.hintsGiven[ranNum]&&this.hintsArray[ranNum]!='-'){
                
                this.returnHint.push(this.hintsArray[ranNum].valueOf());
                this.hintsGiven[ranNum]=true
                gotit=true
            }

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
			return ['r','e','g','e','n','-','e','n','-','z','o','n'];
		} else if (number === 2) {
			return ['b','e','-','s','a','f','e','-','o','n','l','i','n','e'];
		}else if (number === 3) {
			return ['m','a','d','e','-','b','y','-','t','h','e','-','c','o','m','p','i','l','e','r','s'];
		}else if (number === 4) {
			return ['t','h','e','-','c','r','o','w','n','-','i','s','-','y','o','u','r','s'];
		}
         else {
			return ['s','a','f','e','-','p','a','s','s','w','o','r','d','!'];
		}
	}
}