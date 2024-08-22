import React, { useState, useEffect } from "react";
import darkLightVideo from "../assets/darkLight.mp4";
import dark2 from "../assets/dark2.mp4";
import earthVideo from "../assets/earth.mp4";
import nextButton from "../assets/nextButton.png";
import email20 from '../assets/email24.png';
import Login from '../auth/Login';
import Signup from '../auth/Registration';

const VideoBackground = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const currentText= ['WELCOME TO REVOLUTION','WELCOME TO THE SPACE',"WELCOME TO THE REALITY"];
  const currentText1 = ['READY TO CHANGE THE WAY YOU MONEY?','READY TO CHANGE THE WAY YOU EARN',"READY TO CHANGE THE WAY YOUR CURRENCY"];
  const currentText2= ['REVOLUTION','SPACE'," REALITY"];
  const currentText3 = ['CHANGE THE WAY YOU MONEY?','CHANGE THE WAY YOU EARN',"CHANGE THE WAY YOUR CURRENCY"];
  const [count, setCount]=useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const videos = [dark2, darkLightVideo, earthVideo];
  const [showButtons, setShowButtons] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
      setCount((prevVideo) => (prevVideo + 1) % videos.length);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(timer);
  }, [videos.length]);

  const onNextClick = () => {
    setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
    setCount((prevVideo) => (prevVideo + 1) % videos.length);
    console.log('clicked');

  };

  const onLoginClick = () => {
    setShowLogin(true); 
    setShowButtons(false); 

   };
   const onSignupClick = () => {
    setShowSignup(true); 
    setShowButtons(false); 

  };

  const [isLogin, setIsLogin]=useState(true);
const toggleComponent=()=>{
  setIsLogin(!isLogin);
  setShowLogin(isLogin);
  setShowSignup(!isLogin)
}

const opacity= showLogin || showSignup ? 'opacity-0' : 'opacity-100'
const opacityReverse= showLogin || showSignup ? 'opacity-100' : 'opacity-0'
return (
    <div className="bg-cover m-0">
    
      {videos.map((video, index) => (
        <video
          key={index}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute w-screen h-screen object-cover transition-opacity duration-1000 ${
            currentVideo === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
      <div className="text-white absolute p-2 mt-2  ">
        <div className="flex ">
        <img src={email20} alt=" icon" className={`transition-opacity ${opacity}`} />

      <p className={`ml-2 transition-opacity ${opacity}  underline text-xl`}>{currentText[count]}</p>
      
      </div >
      <h1 className={`ml-3 transition-opacity ${opacity}  text-4xl font-bold  mt-2`}>{currentText1[count]}</h1>
 
      </div>

     < div className="right-1 text-white absolute p-2 mt-2 custom3:opacity-100 opacity-0 custom3:w-1/2">
     
      <p className={`ml-2  transition-opacity md:${opacityReverse} opacity-0 underline text-xl`}>{currentText2[count]}</p>
      
    
      <h1 className={`ml-3 transition-opacity md:${opacityReverse} opacity-0  text-4xl font-bold  mt-2`}>{currentText3[count]}</h1>
 
      </div>
     
     

      {/* <button  onClick={onNextClick}
        className="absolute right-20 bottom-72 transition-all duration-300  hover:rounded-3xl hover:brightness-150 hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] hover:scale-110 opacity-0 md:opacity-100"
        >
      <img src={nextButton} alt="Next_Image" />
      </button> */}
  
      <div className="absolute h-screen w-full flex items-end justify-center p-2">
      <button  onClick={onNextClick}
        className="absolute right-20 top-64  transition-all duration-300  hover:rounded-3xl hover:brightness-150 hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] hover:scale-110 opacity-0 md:opacity-100"
        >
      <img src={nextButton} alt="Next_Image" />
      </button>
      {showButtons && ( <div className="flex space-x-4 w-full max-w-md">
    <button onClick={onSignupClick}  className="rounded-3xl border-blue-500 p-3 mb-3 bg-blue-900 text-white flex-1 duration-300  hover:rounded-3xl hover:brightness-150 hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] hover:scale-110 opacity-100 ">
      Signup
    </button>
    <button onClick={onLoginClick} className="rounded-3xl border-blue-500 p-3 mb-3 bg-blue-900 text-white flex-1 duration-300  hover:rounded-3xl hover:brightness-150 hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] hover:scale-110 opacity-100">
      Login
    </button>
    
  </div>)}
</div>

{showLogin && <Login  onToggle={toggleComponent}/>  }
{showSignup && <Signup  onToggle={toggleComponent}/> }
    </div>
  );
};

export default VideoBackground;
