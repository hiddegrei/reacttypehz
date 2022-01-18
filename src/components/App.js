import React,{useEffect,useState} from "react"
import '../assets/css/App.css';
import {db,auth} from "../firebase";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./Login"
import Register  from './Register';
import Main  from "./Main";
import Start from "./Start"
import EndGame from './EndGame';
import MiniGame from "./MiniGame"
import {useStateValue} from "../Stateprovider";
import Tutorial from "./Tutorial"

function App() {
  const[{user},dispatch]=useStateValue();
  const [loaded,setLoaded]=useState(false)

  useEffect(()=>{
    let isSubscribed=true
    if(isSubscribed){
auth.onAuthStateChanged((authUser)=>{
  //console.log('the user is:',authUser.uid);
  if(authUser){
setLoaded(true)
         dispatch({
           type:'SET_USER',
           user:authUser})

          
  }else{
    setLoaded(true)
dispatch({
  type:'SET_USER',
  user:null})
  }
})
    }
    return () => isSubscribed = false
  },[user])

  useEffect(()=>{
    let localUsername=localStorage.getItem("username")
    if(user&&localUsername!="guest"){
    
     db.collection('users').where('userId', '==', user.uid)
    .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           // console.log( doc.data());
            dispatch({
                      type:'SET_PROFILE',
                      profile:doc.data(),
                     }
                    )
            localStorage.setItem("username",doc.data().username)
        });
    }).catch((error)=>console.log(error));

    
    }
                
    
                  
      },[user])

  
  if(!user&&!loaded){return (
    <div style={{flex:1,justifyContent:'center'}}>
      Loading..
    </div>
  )}

   return (
    <Router>
    <div className="app">
    <Switch>

      <Route path="/login">
        <Login/>

      </Route>

      <Route path="/register">
        <Register/>

      </Route>

      <Route path="/start">

      <Start/>

      </Route>

      <Route path="/end">

        <EndGame/>

      </Route>

      <Route path="/tutorial">

        <Tutorial/>

      </Route>

      <Route path="/">

        
        <Main/>

      </Route>

      </Switch>
      
     
    </div>
    </Router>
  );
}

export default App;

