import api from "./api";
import axios from 'axios';

class ReviewService{

    addreview(user,video,rating){
        return api
        .post("/review/",{
            user,
            video,
            rating
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    updatereview(userF,video,rating){
        let user = userF.id;
        let video_id = video.id;
        return api
        .put("/review/review",{
            user,
            video_id,
            rating
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }

} export default new ReviewService();