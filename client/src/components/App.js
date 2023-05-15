import React  from "react";
import Layout from "./Layout";
import './App.css';
import {Routes,Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegisterPage";
import AboutUs from "./pages/AboutUsPage";
import Compose from "./pages/ComposePage";
import YourPosts from "./pages/YourPostsPage";
import Login from "./pages/LoginPage";
import SinglePost from "./pages/SinglePost";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
         <Route index element={<Homepage />} />
         <Route path="/aboutus" element={<AboutUs />} />
         <Route path="/compose" element={<Compose />} />
         <Route path="/posts" element={<YourPosts />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register /> } />
         <Route path="/post/:id" element={<SinglePost />} />
         <Route path="/edit/:id" element={<EditPage />} />
      </Route>
    </Routes>
    
  ) 
}

export default App;
