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

  static userRegistration(firstName, lastName, email, password) {
    return api.post('/user/registration', {
      firstName, lastName, email, password,
    });
  }

  static userLogin(email, password) {
    return api.post('/user/login', { email, password });
  }

  static userForgotPassword(email) {
    return api.post('/user/password-forgot', { email });
  }

  static getUserByEmail(email) {
    return api.get('/user/user', email);
  }

  static getUserProfile() {
    return api.get('/user/profile');
  }

  static userResetPassword(code, email, newPassword) {
    return api.post('/user/password-reset', { code, email, newPassword });
  }

  static getUsersList() {
    return api.get('/users');
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

  static getBookReviews(id) {
    return api.get(`books/${id}/reviews`);
  }
}

export default Api;
