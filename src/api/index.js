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
}
