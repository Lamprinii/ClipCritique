import './Style/VideoPage.css';
import { useLocation } from 'react-router-dom';
import videoService from '../services/video.service';
import { Video } from './models/video';
import ReviewService from '../services/review.service';
import { useState,useContext,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../App';
import ReportVideoModal from './ReportVideoModal';
import { toast } from 'react-toastify';


    
function VideoPage(){
     const location=useLocation();
     const videotemp=location.state;
     const[video, setvideo] = useState("");
     const[userrating, setuserrating] = useState(0);
     const[isLoading, setisLoading] = useState(true);
     const {isLoggedIn,isAdmin,user} = useContext(UserContext);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [flag, setflag] = useState(true) 
     const handleDeleteShow = () => setShowDeleteModal(true);
     const handleDeleteClose = () => setShowDeleteModal(false);



      useEffect(( ) => {
          if (isLoading) {
            videoService.getVideoReview(videotemp.id).then((response) => {
            console.log(videotemp)
            let temp = new Video(videotemp.id, videotemp.imageurl,videotemp.url,videotemp.uploader, videotemp.videoname, response, videotemp.date, Math.floor(response), (response-Math.floor(response))*100, videotemp.category, videotemp.agerating, videotemp.artist)
        
            //console.log(temp)
            setisLoading(false)
            setvideo(temp)
            if (flag == true) {
              var vid = {
                id:videotemp.id, 
              };
              ReviewService.addreview(user, vid, -1)
            }
            })
          }
        
      } ) 

      if (isLoading) {
        return <div className="App">Loading...</div>;
      }
          
  
    
    return (

      <div className="content-container">
  
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css"/>
          <div className='rating'>
            {(() => {
              const arr=[];
                for (let i=0; i<video.count; i++) {
                  arr.push(<div id='ic'>
                  <i className='fas fa-music' icon={faMusic} />
  
                    
                </div>)
                } if (video.percentage>25 && video.percentage<75 ) {
                  
                  arr.push(<div id='ic'>
                  <i id='half' className='fas fa-music' icon={faMusic} />
                    
                </div>) 
                }
  
                if(video.percentage > 74 ) {
                  arr.push(<div id='ic'>
                  <i className='fas fa-music' icon={faMusic} />
  
                </div>)
                }
                  return arr;
            })()} 
          
            {video.rating}
  
  
          </div>
          <div className='video'>
            <iframe id='ytvideo' height='700' src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
  
          <div className='uploader'>
            {video.uploader}
  
          </div>
          
          <div className='uploader'>
            Category: {video.category}
  
          </div>
          
          <div className='uploader'>
            Artist: {video.artist}
  
          </div>

          <div className='uploader'>
            Age Rating: {video.agerating}
  
          </div>
  
          <div className='user-rating' >
  
            <h1> Your Rating:</h1> 
  
            <div className='icr' id='first' onClick={() => {
              document.getElementById('first').classList.remove('selected');
              document.getElementById('second').classList.remove('selected');
              document.getElementById('third').classList.remove('selected');
              document.getElementById('fourth').classList.remove('selected');
              document.getElementById('fifth').classList.remove('selected');
              setuserrating(1)
              document.getElementById('first').classList.add('selected');
            }}>
          
              <FontAwesomeIcon icon={faMusic} />
  
            </div>
            <div className='icr' id='second' onClick={() => {
                document.getElementById('first').classList.remove('selected');
                document.getElementById('second').classList.remove('selected');
                document.getElementById('third').classList.remove('selected');
                document.getElementById('fourth').classList.remove('selected');
                document.getElementById('fifth').classList.remove('selected');
                setuserrating(2)
                document.getElementById('first').classList.add('selected');
                document.getElementById('second').classList.add('selected');
  
                console.log(2)
              }}>
              
              <FontAwesomeIcon  icon={faMusic} />
  
            </div>
            <div className='icr' id='third' onClick={() => {
            document.getElementById('first').classList.remove('selected');
            document.getElementById('second').classList.remove('selected');
            document.getElementById('third').classList.remove('selected');
            document.getElementById('fourth').classList.remove('selected');
            document.getElementById('fifth').classList.remove('selected');
            setuserrating(3)
            document.getElementById('first').classList.add('selected');
            document.getElementById('second').classList.add('selected');
            document.getElementById('third').classList.add('selected');
            }}>
              <FontAwesomeIcon icon={faMusic} />
  
            </div>
            <div className='icr' id='fourth' onClick={() => {
            document.getElementById('first').classList.remove('selected');
            document.getElementById('second').classList.remove('selected');
            document.getElementById('third').classList.remove('selected');
            document.getElementById('fourth').classList.remove('selected');
            document.getElementById('fifth').classList.remove('selected');
            setuserrating(4)
            document.getElementById('first').classList.add('selected');
            document.getElementById('second').classList.add('selected');
            document.getElementById('third').classList.add('selected');
            document.getElementById('fourth').classList.add('selected');
  
            }}>
              <FontAwesomeIcon icon={faMusic} />
  
            </div>
            <div className='icr' id='fifth' onClick={() => {
            document.getElementById('first').classList.remove('selected');
            document.getElementById('second').classList.remove('selected');
            document.getElementById('third').classList.remove('selected');
            document.getElementById('fourth').classList.remove('selected');
            document.getElementById('fifth').classList.remove('selected');
            setuserrating(5)
            document.getElementById('first').classList.add('selected');
            document.getElementById('second').classList.add('selected');
            document.getElementById('third').classList.add('selected');
            document.getElementById('fourth').classList.add('selected');
            document.getElementById('fifth').classList.add('selected');
            }}>
              <FontAwesomeIcon icon={faMusic} />
  
            </div>
  

            <button class="button-56" role="button" onClick={() => {
              if(!isLoggedIn){
                toast.error("You are not logged in!")
                return;
              }
              var vid = {
                id:videotemp.id, 
              };
              console.log(userrating);
            ReviewService.updatereview(user, vid, userrating).then((response)=>{
              toast.success("Your rating has been succesfully submitted.")
              setisLoading(true);
            });
            
            
            } }>Submit</button>
            {isAdmin && isLoggedIn && (
              <Button variant="danger" size="lg" className="report-video-button" onClick={() => handleDeleteShow(video)}>
                Report Video
              </Button>
            )}
  

          </div>

          {showDeleteModal && (<ReportVideoModal
                show={showDeleteModal}
                video={video}
                onHide={() => setShowDeleteModal(false)}
                showModal = {handleDeleteShow}
                closeModal = {handleDeleteClose}
        />
        )}
  
        </div>


    );

}

export default VideoPage;
