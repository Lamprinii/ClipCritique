import { useState,useContext,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './Style/VideoList.css';
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Video } from "./models/video";
import videoService from "../services/video.service";
import { videomin } from "./models/video";
import { UserContext } from '../App';
import { toast } from 'react-toastify';


function ForYouPage() {


const navigate=useNavigate();
const[videos,setVideos]=useState([])
const[isLoading, setisLoading] = useState(true);
const {isLoggedIn,isAdmin,user} = useContext(UserContext);


useEffect(() => {
  if (!isLoggedIn) {
    toast.error("You need to login to view the application")
    navigate("/login")
  }
  if (isLoading && isLoggedIn) {
      videoService.getSuggestedVideo(user.id).then((response) => {
      console.log(response.length)
      for (let i=0; i<response.length; i++) {
        if((videos.length<response.length)){
          let id=response[i].link.split("?")[0].split("/")
        let video = new videomin(response[i].id, "https://img.youtube.com/vi/"+id[id.length-1]+"/0.jpg", response[i].link, response[i].uploader.fullName, response[i].name, response[i].uploadLocalDate, response[i].category, response[i].agerating, response[i].artist)
        videos.push(video) }
      }
     setisLoading(false) } )
    }

  },[]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
    return (

      <div>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css"/>
      
          <h1>
          For You
          </h1>
      
          <div className='add-movie-button' onClick={()=>{
      if(isLoggedIn){
        navigate("/upload")
      }
      else{
        toast.error("You need to login to upload a video")
      }}}>
            <a>
              <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
            </a>

          </div>
            
                {videos.map((video)=>(
      
                <div className="video-container" onClick={()=>{
                  if (isLoggedIn) {
                    navigate("/video",{state:video})
                  } else {
                    toast.error("You need to login to view a video")
                    navigate("/login")
                  }
                  }}>
      
                <div>
                  <img className='moviePhoto' src={video.imageurl}></img>
                </div>
          
      
                 <div>
                    <div className="videoname">
                    {
                      video.videoname
                    }
                    </div>

                    <div className="uploader"> 
                      Artist: {video.artist}
                    </div>
                    
                    <div className="uploader"> 
                      Upload Date: {video.date}
                    </div>

                    <div className='uploader'>
                     {video.uploader}
                    </div>
                </div>
              </div>
             ))}
      </div>
      )
  }


   
}

export default ForYouPage;
