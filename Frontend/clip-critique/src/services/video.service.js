import api from "./api";
import axios from 'axios';

class VideoService {
    getVideo(){
        return api
        .get("/video/")
        .then(response => {
          return response.data;
        });
    }

    getSuggestedVideo(user_id){ 
      return api
      .get("/video/personalize/"+user_id)
      .then(response => {
        return response.data;
      });
  }

    getQuestionnaire(){
      return api
      .get("/question/")
      .then(response => {
        return response.data;
      });
  }

    addvideo(link,uploadDateTime,name,uploader,category,agerating){
      return api
      .post("/video/",{
          link,
          uploadDateTime,
          name,
          uploader,
          category,
          agerating
      })
      .then(response => {
          return response.data;
      })
      .catch(error => {
          throw error; // Rethrow the error to handle it in the caller
      });
  }

  getVideoReview(id){
        return api
        .get("/video/rating/"+id)
        .then(response => {
          return response.data;
        });
    }
  
  deleteVideo(video_id){
        return api
        .delete("/video/"+video_id)
        .then(response => {
          return response.data;
        })
        .catch(error => {
            console.error("Error deleting video:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

} export default new VideoService
