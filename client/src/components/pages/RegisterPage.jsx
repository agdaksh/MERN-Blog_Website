import React ,{useState} from "react";
export default function Register(){
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  function changeUsername(event){
    const {value} = event.target;
    setUsername(value);
  }
  function changePassword(event){
    const{value}=  event.target;
    setPassword(value)
  }
  async function register(event){
     event.preventDefault();
     const response = await fetch("http://localhost:4000/register",{
      method:"POST",
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'}
     })
     if(response.status === 200){
      alert("successfull");
     }else{
      alert("username already taken. try with a different username")
     }
     setPassword("");
     setUsername("");
  }
    return (
      
        <div className="register" >
      <h1> Register </h1>
      
      <form onSubmit={register}>
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
        <button className="registerButton">Register</button>
      </form>
    </div>
    )
      
}