import firebase from "firebase";
import React from "react";
import {db} from "../firebase"
import {useStateValue} from "../Stateprovider";
export default class ScoreToDatabase {

    
/**
 * update highscore in database als er is ingelogd
 * @param score totalscore of current game
 */
    public  update(score:number){
        console.log(score)
        let data: firebase.firestore.DocumentData | undefined;
        //db.collection("users").doc()
        //const[{user,username,password}]=useStateValue();
        let username=localStorage.getItem("username")
        console.log(username)
        if(username){
        db.collection("users").doc(username).get().then((doc)=>{
            data=doc.data()

        }).then(()=>{
            if(data){
                if(data.highscore<score&&username){
                    db.collection("users").doc(username).update({
                        highscore:score
                    })

                }
                return;

            }else{
                return;
            }
        })
        }else{
            return;
        }
    }

   
}