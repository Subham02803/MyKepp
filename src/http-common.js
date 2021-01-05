import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/FileUpload",
  headers: {
    "Content-type": "multipart/form-data",
  }
});

export default instance;