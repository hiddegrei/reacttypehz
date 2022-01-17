import React,{useEffect,useState} from "react"
import "../assets/css/Tutorial.css"


function Tutorial(){




    return(
        <div className="tutorial">
            <h1>Tutorial</h1>

 
            <div className="tutorial_layer">
                <article>
                 <h3>Move the player and steel keys</h3>
                    <img alt="" src="./img/tutorial/tutsteel.png"></img>
                </article>

                <article>
                    <h3>Enter rooms with key</h3>
                    <p>to play minigames to receive hints </p>
                    <img alt="" src="./img/tutorial/tutroom.png"></img>
                </article>
            </div>

            <div className="tutorial_layer">
                <article>
                    <h3>Watch out for the guards! Stay out of there sight</h3>
                    <p>The agents have 4 levels, from yellow, orange, red </p>
                </article>
            </div>

            <div className="tutorial_layer">
                <article>
                    <h4>yellow agent has the biggest hack range</h4>
                    <img className="tutorial_img_small" alt="" src="./img/tutorial/tutyellow.png"></img>
                </article>

                <article>
                    <h4>orange agent has the middle hack range</h4>
                    <img className="tutorial_img_small" alt="" src="./img/tutorial/tutorange.png"></img>
                </article>

                <article>
                    <h4>red agent has the smallest hack range</h4>
                 <img className="tutorial_img_small" alt="" src="./img/tutorial/tutred.png"></img>
                </article>

                <article>
                    <p>If you encounter an agent with green sight, it means it's searching you!</p>
                    <img className="tutorial_img_small" alt="" src="./img/tutorial/tutgreen.png"></img>
                </article>
           
            </div>
        </div>    
    )
}

export default Tutorial