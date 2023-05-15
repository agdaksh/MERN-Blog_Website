import React from "react";
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Link } from "react-router-dom";
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

export default function Post({_id,title,summary,cover,createdAt,author}){
    
    return (
        <div className="post">
         <div className="picture">
         <Link to={`/post/${_id}`}>
         <img src={"http://localhost:4000/"+cover} alt="post"></img>
         </Link>
           
         </div>
         <div className="texts">
         <Link to={`/post/${_id}`}>
         <h2>{title}</h2>
         </Link>
            <p className="info">
                <p className="author" >{author.username}</p>
                <time><ReactTimeAgo date={createdAt} locale="en-US"/></time>
            </p>
            <p className="summary" >
               {summary}
            </p>
         </div>
        </div>
    )
}