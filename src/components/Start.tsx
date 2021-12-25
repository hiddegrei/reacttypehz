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
        <h1>BankKraker</h1>
        <form action="./start.html">
            <label >Naam</label>
            <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)}value={username}/>
            <label >Wachtwoord</label>
            <input type="text" id="password" name="password" onChange={(e)=>setPassword(e.target.value)}value={password}/>
            
            <button onClick={()=>handleForm()} id="start-btn">Start</button>
           
        </form>
       

    </div>

        </div>
    )
}

export default Start