import axios from "axios";
axios.defaults.baseURL = "https://www.googleapis.com/books/v1/";

export default {
  getBooks(q = 'steven+king', startIndex = 0, maxResults = 30) {
    return axios.get(`volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResults}`);
  },

  getBookById(id) {
    return axios.get(`/volumes/${id}`);
  }

};
