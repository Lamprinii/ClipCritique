import api from "./api";

class QuestionnaireService {
  add(user, category1, category2, category3, prefer_songs1, prefer_songs2, prefer_songs3) {
    console.log(category1)
    console.log(prefer_songs1)
    console.log(user)
    return api
      .post("/questionnaire/", {
        user,
        category1,
        category2,
        category3,
        prefer_songs1,
        prefer_songs2,
        prefer_songs3,
      })
      .then(response => {
        return response.data;
      }).catch(error => {
        throw error;
      });
  }

  logout() {
    return api.get("/user/logout");
  }

}

export default new QuestionnaireService()