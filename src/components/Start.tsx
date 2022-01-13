import React,{useEffect,useState} from 'react';
import {useStateValue} from "../Stateprovider";
import {useHistory} from "react-router-dom";
import "../assets/css/Start.css"
function Start(){
    const history=useHistory()
    const[{user,handle},dispatch]=useStateValue();
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    useEffect(()=>{
        if(!user){
            history.push("/login")
        }

    },[])

    function handleForm(){
        dispatch({
            type:'SET_INLOG',
            username:username,
            password:password
            
           
            
        })

        history.push("/")

    }


    return(
        <div className="start">
            
            
          

    <div id="start">
    <h1>Kraak de Kluis</h1>
    <div className='bottom'>
        <h2 className="description"> Welkom bij het spel Kraak de Kluis. Je begint het spel als een bankovervaller die een account aanmaakt op het DarkWeb.
             Om dit acccount aan te maken voer je een gebruikersnaam en wachtwoord in zodat je al je gestolen spulletjes kunt verkopen.<br></br>
             <br></br>
                       Op het moment dat je de bank inloopt gaat er een alarm af. Nu begint je tijd te lopen, omdat de politie al onderweg is.
                        Om de kluis te kunnen openen moet je eerst puzzels oplossen. Die zijn verspreidt over het hele level. Maar pas wel
                op! Er zijn bewakers die naar je opzoek zijn.</h2>
                <div className='form'>
        <form action="./start.html">
            <label >Naam</label>
            <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)}value={username}/>
            <label >Wachtwoord</label>
            <input type="text" id="password" name="password" onChange={(e)=>setPassword(e.target.value)}value={password}/>
            
            <button onClick={()=>handleForm()} id="start-btn">Start</button>
           
        </form>
        </div>
        </div>
       

    </div>

        </div>
    )
}

export default Start