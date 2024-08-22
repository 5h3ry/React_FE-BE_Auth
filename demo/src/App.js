// import { useState } from 'react';
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoBackground from './backgroundVideos/VideoBackground';



export default function App() {
    
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<VideoBackground/>}  />
    <Route path="/home" element={<Home/>}  />


    </Routes>
    </BrowserRouter>
   
              
        
 
  );
}
