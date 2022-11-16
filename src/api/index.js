import api from "./interceptor";

let axiosConfig = {
  withCredentials: true,
};

export default class QueryHandler {
  static async fetchArticles(skip = 0, limit = 3) {
    const response = await api.get(`/news?skip=${skip}&limit=${limit}`);

    const data = await response.data;
    return data;
  }

  static async fetchArticleByUrl(newsUrl) {
    const response = await api.get(`/news/${newsUrl}`);

    const data = await response.data;
    return data;
  }

  static async fetchArticlesByCategoryUrl(categoryUrl) {
    const response = await api.get(`/news/category/${categoryUrl}`);
    const data = await response.data;
    return data;
  }

  static async publishArticle(id, published) {
    const response = await api.post(
      `/news/${id}/publish?published=${published}`
    );

    const data = await response.data;
    return data;
  }

  static async deleteArticle(id) {
    const response = await api.delete(`/news/${id}`);

    const data = await response.data;
    return data;
  }

  static async createArticle(data) {
    const response = await api.post(`/news`, data);
    const res = await response.data;
    return res;
  }

  static async updateArticle(id, data) {
    const response = await api.put(`/news/${id}`, data);
    const res = await response.data;
    return res;
  }

  static async fetchCommentsByArticleId(articleId) {
    const response = await api.get(`/comments/article/${articleId}`);

    const data = await response.data;
    return data;
  }
  static async register(name, email, password) {
    const response = await api.post(`/user/register`, {
      name,
      email,
      password,
    });

    const data = await response.data;
    return data;
  }

  static async login(email, password) {
    const response = await api.post(
      `/user/login`,
      {
        email,
        password,
      },
      axiosConfig
    );

    const data = await response.data;
    return data;
  }

  static async forgotPassword(email) {
    const response = await api.post(`/user/forgot-password`, {
      email,
    });

    const data = await response.data;
    return data;
  }
  static async restorePassword(password1, password2, token) {
    const response = await api.post(`/user/restore-password`, {
      password1,
      password2,
      token,
    });

    const data = await response.data;
    return data;
  }

  static async fetchToken() {
    const response = await api.get(`/user/token`);

    const data = await response.data;
    return data;
  }

  static async fetchMe() {
    const response = await api.get(`/user/me`);

    const data = await response.data;
    return data;
  }

  static async logout() {
    const response = await api.get(`/user/logout`);

    const data = await response.data;
    return data;
  }
}
