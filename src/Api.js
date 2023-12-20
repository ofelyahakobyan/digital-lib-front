import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token;
  }
  return config;
}, () => {

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

  static userResetPassword(code, email, newPassword) {
    return api.post('/user/password-reset', { code, email, newPassword });
  }

  static userChangePassword(currentPassword, newPassword) {
    return api.post('/user/password-change', { currentPassword, newPassword });
  }

  static getUserProfile() {
    return api.get('/user/profile');
  }

  static getUsersList() {
    return api.get('/users');
  }

  static editProfile(firstName, lastName, phone, nickName, country, dob, shortAbout) {
    return api.patch('user/profile', {
      firstName, lastName, phone, nickName, country, dob, shortAbout,
    });
  }

  static getUserReviews(userID, page, limit) {
    return api.get('/user/reviews', {
      params: {
        page,
        limit,
      },
    });
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

  static getBooksByCategory(categoryId, page, limit) {
    return api.get(`/books/category/${categoryId}`, {
      params: {
        page,
        limit,
      },
    });
  }

  static getBookReviews(id) {
    return api.get(`books/${id}/reviews`);
  }

  static postBookReview(bookId, title, content, rating) {
    return api.post(`user/reviews/${bookId}`, {
      title, content, rating,
    });
  }

  static patchBookReviewEdit(reviewId, title, content, rating) {
    return api.patch(`user/reviews/${reviewId}`, {
      title, content, rating,
    });
  }

  static deleteBookReview(reviewId) {
    return api.delete(`user/reviews/${reviewId}`);
  }

  static getBooks(params) {
    return api.get('/books', {
      params: {
        ...params,
      },
    });
  }

  static getSingleBook(id) {
    return api.get(`/books/single/${id}`);
  }

  static getUserWishList(params) {
    return api.get('/user/wishlist', {
      params: {
        ...params,
      },
    });
  }

  static postUserWishList(bookId) {
    return api.post(`/user/wishlist/${bookId}`);
  }

  static deleteUserWishList(id) {
    return api.delete(`/user/wishlist/${id}`);
  }

  static getUserCard(params) {
    return api.get('/user/cart', {
      params: {
        ...params,
      },
    });
  }

  static postUserCard(id) {
    return api.post(`/user/cart/${id}`);
  }

  static deleteUserCard(id) {
    return api.delete(`/user/cart/${id}`);
  }
}

export default Api;
