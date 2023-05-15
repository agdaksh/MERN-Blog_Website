import React ,{useState,useContext} from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../userContext";
export default function Login(){
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[redirect,setRedirect] = useState(false);
  const {userInfo,setUserInfo} = useContext(UserContext);
  function changeUsername(event){
    const {value} = event.target;
    setUsername(value);
  }
  function changePassword(event){
    const{value}=  event.target;
    setPassword(value)
  }
  async function login(event){
     event.preventDefault();
     const response = await fetch("http://localhost:4000/login",{
      method:"POST",
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:"include"
     });
     if(response.ok){
      response.json().then(userinfo =>{
        setUserInfo(userinfo);
        setRedirect(true);
      })
     }else{
      alert("wrong credentials");
     }
    
  }
  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
       <div className="register" >
      <h1> Login </h1>
      <form onSubmit={login}>
        <input className="details"
        value={username}
        onChange={changeUsername}
        type="text"
          name="username"
          placeholder="Your Username"
        />
        <input className="details"
        value={password}
        onChange={changePassword}
        type="password"
          name="password"
          placeholder="Your Password"
        />
        <button className="registerButton">Login</button>
      </form>
    </div>
    )
      
}