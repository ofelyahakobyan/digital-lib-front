import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});
class Api {
  static getAuthors() {
    return api.get('/authors');
  }
}

export default Api;
