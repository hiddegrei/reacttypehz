export default class Vector{

    public x:number;
    public y:number;

    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }

    public add(a:Vector){
        this.x+=a.x;
        this.y+=a.y;
    }
    public sub(a:Vector){
        this.x-=a.x;
        this.y-=a.y;
    }

    public static add(a: { x: any; y: any; },b: { x: any; y: any; }){

        return {x:a.x+b.x,y:a.y+b.y}

    }
    public limit(lim: number){


        let lengthV=Math.sqrt(this.x*this.x+this.y*this.y)
        if(lengthV<=lim||lengthV===0){
            
        }else{
            let newx=this.x/lengthV;
            let newy=this.y/lengthV;
            this.x=newx*lim
            this.y=newy*lim
            
            
        }

    }


    public static limit(a: { x: number; y: number; },lim: number){

        let lengthV=Math.sqrt(a.x*a.x+a.y*a.y)
        if(lengthV<=lim){
            return a
        }else{
            let newx=a.x/lengthV;
            let newy=a.y/lengthV;
            return {x:newx*lim,y:newy*lim}
        }

    }

    public setMag(mag: number){
        let lengthV=Math.sqrt(this.x*this.x+this.y*this.y)
        if(lengthV!=0){
        let newx=this.x/lengthV;
        let newy=this.y/lengthV;
            this.x=newx*mag;
            this.y=newy*mag
        }
        

    }


    public static setMag(a: { x: number; y: number; },mag: number){
        let lengthV=Math.sqrt(a.x*a.x+a.y*a.y)
        
            let newx=a.x/lengthV;
            let newy=a.y/lengthV;
            return {x:newx*mag,y:newy*mag}
        

    }

    public static sub(a: { x: number; y: number; },b: { x: number; y: number; }){
        return {x:a.x-b.x,y:a.y-b.y}
    }

    public dist(){
        
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }

    public static dist(a: { x: number; y: number; },b: { x: number; y: number; }){
        const l1=a.x-b.x;
        const l2=a.y-b.y;
        return Math.sqrt(l1*l1+l2*l2)
    }

    
}