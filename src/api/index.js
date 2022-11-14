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
}
