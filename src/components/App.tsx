import '../assets/css/App.css';
import {db} from "../firebase";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./Login"
import Register  from './Register';
import Main  from "./Main";
import Start from "./Start"
import EndGame from './EndGame';
import MiniGame from "./MiniGame"


function App() {

  


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

      <Route path="/minigame">

        <MiniGame/>

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

