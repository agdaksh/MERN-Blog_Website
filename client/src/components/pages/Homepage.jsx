import {useState, useEffect } from "react";

import Post from "../Posts";

export default function Homepage(){
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
             <Post {...item}/>
            )
        })}
      </>
    );
}