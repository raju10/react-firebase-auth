import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [users ,setUsers] = useState({
    isSignInUser : false,
    email : "",
    photo : "",
    name : ""
  })
  console.log(users)

  var googlrProvider = new firebase.auth.GoogleAuthProvider();

  const handelSignIn = () => {
      firebase.auth()
      .signInWithPopup(googlrProvider)
      .then(res => {
       const {displayName , email , photoURL} = res.user;

       const signInUser = {
           isSignInUser : true,
           email : email,
           photo : photoURL,
           name : displayName
       }
      setUsers(signInUser)
      
    })
    .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
      // var email = error.email;
      // var credential = error.credential;

       console.log("err", errorCode,errorMessage)
    
    });
  }
  // sign out 
  const handelSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
          const signOutUser = {
            isSignInUser : false,
            email : "",
            photo : "",
            name : ""
          }
          setUsers(signOutUser)
        })
      .catch((err) => {
          console.log(err)
       });
      }
  return (
    <div className="App">

       {
         users.isSignInUser ? <button onClick={handelSignOut}>Sign out</button> :
         <button onClick={handelSignIn}>Sign in</button>
       }
          

          {
            users.isSignInUser && <div>
                     <h3>User Name : {users.name}</h3>
                     <h2>User Email : {users.email}</h2>         
                     <img src={users.photo} alt=""/>
            </div>
          }
         

    </div>
  );
}

export default App;
