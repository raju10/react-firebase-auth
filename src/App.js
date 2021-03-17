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
    password : "",
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

      ////////////////////////////////////////////

      const handelOnBlur = (e) =>{
            console.log(e.target.name , e.target.value)
              
            let isFromValid = true;
            if(e.target.name === "email"){
                const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value)
                 isFromValid = isEmailValid
            }
            if(e.target.name ==="password"){
               const isPasswordValid = e.target.value.length >=6 ;
               const passwordHasNum = /\d{1}/.test(e.target.value)
                isFromValid = isPasswordValid && passwordHasNum
            }
            if(isFromValid){
              const newUserInfo = {...users}
               newUserInfo[e.target.name] = e.target.value
               setUsers(newUserInfo)
            }
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

          {/* new start */}
          
          <h1>Our Own Authentication</h1>
          <p>Name : {users.name}</p>
          <p>Email : {users.email}</p>
          <p>Password : {users.password}</p>
          <form action="">
              <input type="text" name="name" onBlur={handelOnBlur} placeholder="Your Name" required/>
                 <br/>
              <input type="email" name="email" id="" onBlur={handelOnBlur} placeholder="Your email addres" required/>
                 <br/>
              <input type="password" name="password" id=""  onBlur={handelOnBlur}  placeholder="Your password" required/>
                 <br/>
              <input type="submit" value="Submit"/>
         </form>

    </div>
  );
}

export default App;
