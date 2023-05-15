import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import React from "react";

export default function SinglePost(){
    const {userInfo} = useContext(UserContext);
    const [postInfo,setPostInfo] = useState(null)
    const {id} = useParams();
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(Info => {
                  setPostInfo(Info);
                  
            });
        });
    },[]);
    if(!postInfo) return '';
    return (
        <div className="post-page">
        <h1>{postInfo.title}</h1>
        <div className="author">by {postInfo.author.username}</div>
        {userInfo.id ===postInfo.author._id && (
            <div>
            <Link to={`/edit/${postInfo._id}`}>edit this post</Link>
            </div>
        )}
        
          <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}` }alt="post"></img>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}
/*        <time><ReactTimeAgo date={postInfo.createdAt} locale="en-US"/></time>
        <div className="author">by {postInfo.author.username}</div>
        
        
        {userInfo.id === username && (
            <div>
                <Link>edit this post</Link>
            </div>
        )}
        
        */