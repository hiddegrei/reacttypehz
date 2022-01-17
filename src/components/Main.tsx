import React,{useEffect,useState} from 'react';
import {db} from "../firebase";
import {useStateValue} from "../Stateprovider";
import "../assets/css/Main.css"
import Game from "../classes/Game";
import TimeLimit from "../classes/TimeLimit";
import {useHistory} from "react-router-dom";
function Main() {
    const[{user,profile,username,password}]=useStateValue();
    const history=useHistory()
    
       

    useEffect(()=>{
         let time=0
        if(user){
           // console.log(user)
        }else{
            history.push("/login")
        }
        if(username&&password){
           
            let timelimit=new TimeLimit(password)
            time=timelimit.timeLimit
            

            localStorage.setItem("username",profile.username)
            

        }else{
history.push("/start")
        }
       

        
    //      canvas=document.getElementById("canvas")
    //      ctx=canvas.getContext("2d")
    //  test= new Test(ctx)

     const game = new Game(document.getElementById('canvas'),time/10)
     game.start()
        
        //  test.display()
        
        
        
    },[])
    
    return (
        <div  className="main" >
            
           
                
                <canvas width="400px" height="400px" id="canvas"></canvas>
                <div className="hud" id="progressBar"></div>
    <div className="hud" id="progress">Voortgang: <span id="progressNumber"></span>%</div>
            
        </div>
    )
}

export default Main
