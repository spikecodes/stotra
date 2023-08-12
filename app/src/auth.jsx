import axios from "axios";

class Auth {
  constructor() {
    if (Auth.instance) {
      return Auth.instance;
    }

    this.jwt = null;
    this.username = null;
    Auth.instance = this;
    return this;
  }

  async signup(username, password) {
    try {
      const res = await axios.post("http://localhost:3010/api/auth/signup", {
        username,
        password,
      });
      console.log(res);
      return "success";
    } catch (err) {
      console.log(err);
      return err.response.data.message;
    }
  }

  async login(username, password) {
    try {
      const res = await axios.post("http://localhost:3010/api/auth/login", {
        username,
        password,
      });
      console.log("da");
      if (res.data.accessToken !== undefined) {
        this.jwt = res.data.accessToken;
        this.username = username;
        console.log(this.username);

        return "success";
      } else {
        return "Invalid credentials.";
      }
    } catch (err) {
      console.log(err);
      return err.response.data.message;
    }
  }

  getUsername() {
    console.log(this.username);
    return this.username;
  }

  logout() {
    this.jwt = null;
    this.username = null;
  }
}

const authInstance = new Auth();
export default authInstance;
