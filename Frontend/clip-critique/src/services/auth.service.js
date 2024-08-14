import api from "./api";

class AuthService {
  login(email, password) {
    return api
      .post("/user/login", {
        email,
        password
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

  register(fullName, email, password, dateOfBirth) {
    return api.post("/user/register", {
      fullName,
      email,
      password,
      dateOfBirth,
    });
  }

}

export default new AuthService()