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

  static getAuthorsBooks(id, page, limit) {
    return api.get(`/books/author/${id}`, {
      params: {
        page,
        limit,
      },
    });
  }

  static getBooksByCategoryForHomePage(id, page, limit) {
    return api.get(`books/category/${id}`, {
      params: {
        page,
        limit,
      },
    });
  }

  static getCategoriesList(page, limit) {
    return api.get('/categories', {
      params: {
        page,
        limit,
      },
    });
  }
}

export default Api;
