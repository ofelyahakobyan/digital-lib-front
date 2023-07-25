import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});
class Api {
  static getAuthors(page, limit) {
    return api.get('/authors', {
      params: {
        page,
        limit,
      },
    });
  }

  static getSingleAuthor(id) {
    return api.get(`/authors/single/${id}`);
  }
}

export default Api;
