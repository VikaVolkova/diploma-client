import api from "./interceptor";

const baseURL = "http://localhost:5000/api";

export default class QueryHandler {
  static async fetchArticles(skip = 0, limit = 3) {
    const response = await api.get(
      `${baseURL}/news?skip=${skip}&limit=${limit}`
    );

    const data = await response.data;
    return data;
  }

  static async fetchArticleByUrl(newsUrl) {
    const response = await api.get(`${baseURL}/news/${newsUrl}`);

    const data = await response.data;
    return data;
  }

  static async fetchArticlesByCategoryUrl(categoryUrl) {
    const response = await api.get(`${baseURL}/news/category/${categoryUrl}`);
    const data = await response.data;
    return data;
  }

  static async publishArticle(id, published) {
    const response = await api.post(
      `${baseURL}/news/${id}/publish?published=${published}`
    );

    const data = await response.data;
    return data;
  }

  static async deleteArticle(id) {
    const response = await api.delete(`${baseURL}/news/${id}`);

    const data = await response.data;
    return data;
  }

  static async createArticle(data) {
    const response = await api.post(`${baseURL}/news`, data);
    const res = await response.data;
    return res;
  }

  static async updateArticle(id, data) {
    const response = await api.put(`${baseURL}/news/${id}`, data);
    const res = await response.data;
    return res;
  }

  static async fetchCommentsByArticleId(articleId) {
    const response = await api.get(`${baseURL}/comments/article/${articleId}`);

    const data = await response.data;
    return data;
  }
  static async register(email, password) {
    const response = await api.post(`${baseURL}/user/register`, {
      email,
      password,
    });

    const data = await response.data;
    return data;
  }

  static async login(email, password) {
    const response = await api.post(`${baseURL}/user/login`, {
      email,
      password,
    });

    const data = await response.data;
    return data;
  }

  static async forgotPassword(email) {
    const response = await api.post(`${baseURL}/user/forgot-password`, {
      email,
    });

    const data = await response.data;
    return data;
  }
  static async restorePassword(password1, password2, token) {
    const response = await api.post(`${baseURL}/user/restore-password`, {
      password1,
      password2,
      token,
    });

    const data = await response.data;
    return data;
  }

  static async fetchToken() {
    const response = await api.get(`${baseURL}/user/token`);

    const data = await response.data;
    return data;
  }

  static async fetchMe() {
    const response = await api.get(`${baseURL}/user/me`);

    const data = await response.data;
    return data;
  }

  static async logout() {
    const response = await api.get(`${baseURL}/user/logout`);

    const data = await response.data;
    return data;
  }
}
