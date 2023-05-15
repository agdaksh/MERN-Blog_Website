import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
 const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


export default function EditPage(){
    
    const {id} = useParams();
    const[title,setTitle] = useState("");
    const[summary,setSummary] = useState("");
    const[content,setContent] = useState("");
    const[files,setFiles] = useState("");
    const[redirect,setRedirect] = useState(false);
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(Info => {
                setContent(Info.content);
                setTitle(Info.title);
                setSummary(Info.summary);
            });
        });
    },[]);
    

    
    function handleTitle(event){
        setTitle(event.target.value)
    }
    function handleSummary(event){
        setSummary(event.target.value)
    }
    function handleContent(newValue){
        setContent(newValue);
    }
    
    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
      data.set("title",title);
      data.set("summary",summary);
      data.set("content",content);
      data.set("id",id);
      if(files?.[0]){
        data.set("file",files?.[0]);
      }
      
     const response = await fetch("http://localhost:4000/compose",{
        method:"PUT",
        body:data,
        credentials:"include"
      });
      if(response.ok){
        setRedirect(true);
      }else{
        alert("something wrong");
      }
    }
    
    if(redirect){
        return (<Navigate to={"/post/"+id}/>);
     }
     return (
         <div>
             <form onSubmit={updatePost} >
             <div> <input type="title" placeholder="Title" value={title} onChange={handleTitle}/></div>
             <div><input type="summary" placeholder="Summary" value={summary} onChange={handleSummary} /></div>
             <div><input type="file"  onChange={ev =>{
                 setFiles(ev.target.files);
             }} /></div>
                 <ReactQuill onChange={handleContent} value={content} modules={modules} formats={formats} placeholder="Write your recipe here"></ReactQuill>
                 <button>Update Post</button>
             </form>
         </div>
     )
}