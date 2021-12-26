import React,{useEffect,useState} from 'react';
import {db} from "../firebase";
import {useStateValue} from "../Stateprovider";
import "../assets/css/Main.css"
import Game from '../classes/Game';
import TimeLimit from '../classes/TimeLimit';
import {useHistory} from "react-router-dom";
function Main() {
    const[{user,username,password}]=useStateValue();
    const history=useHistory()
    
       

    useEffect(()=>{
         let time=0
        if(user){
            console.log(user)
        }else{
            history.push("/login")
        }
        if(username&&password){
            console.log(username,password)
            let timelimit=new TimeLimit(password)
            time=timelimit.timeLimit
            console.log(time)

        }else{
history.push("/start")
        }
       

        
    //      canvas=document.getElementById("canvas")
    //      ctx=canvas.getContext("2d")
    //  test= new Test(ctx)

     const game = new Game(document.getElementById('canvas'),time)
     game.start()
        
        //  test.display()
        
        
        
    },[])
    
    return (
        <div  className="main" >
            
           
                
                <canvas width="400px" height="400px" id="canvas"></canvas>
            
        </div>
    )
}

export default Main
