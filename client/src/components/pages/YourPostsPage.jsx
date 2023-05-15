import {useState, useEffect, useContext } from "react";

import Post from "../Posts";
import { UserContext } from "../userContext";

export default function Homepage(){
    const{userInfo} = useContext(UserContext);
    const [post,setPost] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/compose").then(response=>{
            response.json().then(blog=>{
                setPost(blog);
            })
        })
    },[])
    return(
        <>
        {post.map((item)=>{
            return(
             (userInfo.id===item.author._id) && <Post {...item}/>
            )
        })}
      </>
    );
}