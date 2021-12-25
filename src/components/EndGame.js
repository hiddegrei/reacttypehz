import React,{useEffect,useState} from 'react';
import {useStateValue} from "../Stateprovider";
import {useHistory} from "react-router-dom";
import "../assets/css/EndGame.css"
function  EndGame(){
    const history=useHistory()
    const[{user,handle},dispatch]=useStateValue();
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    useEffect(()=>{

    },[])

    function handleForm(){
        dispatch({
            type:'SET_INLOG',
            username:username,
            password:password
            
           
            
        })

        history.push("/start")

    }


    return(
        <div className="end">
            
           <div className='img' ></div>
           <img src="../img/background/the-button-859351_960_720.png"></img>
            

        </div>
    )
}

export default EndGame