import React, {useState,useEffect,useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./userContext";

export default function Head(){
  const{userInfo,setUserInfo} = useContext(UserContext);
  useEffect(()=>{
      fetch("http://localhost:4000/profile",{
        credentials:"include"
      }).then(response=>{
        response.json().then(Info=>{
          setUserInfo(Info)
        })
      })
  },[]);
  async function logout(){
   await fetch("http://localhost:4000/logout",{
      credentials:"include",
      method:"POST"
    })
    setUserInfo("");
  }
    return (
        <div>
            <nav class="navbar navbar-default">
    <div className="container">
    <div className="navbar-header">
        <p className="navbar-brand"><Link to="/">the Bawarchi Studio</Link></p>
      </div>
        <ul className="nav navbar-nav navbar-right">
          <li id="about"><Link to="/aboutus">About Us</Link></li>
          
          {userInfo?.username ? <> <li id="compose"><Link to="/compose">Compose</Link></li><li id="post"><Link to="/posts">Your Posts</Link></li><li id="logout"><a href="/" onClick={logout}>Logout </a></li></>
          :<><li id="login"><Link to="/login">Login</Link></li>
          <li id="contact"><Link to="/register">Register</Link></li></>}
          
        </ul>
    </div>
  </nav>
        </div>
    )
}