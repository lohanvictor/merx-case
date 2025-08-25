export class ApiService {
  static async get<T>(url: string, params?: Record<string, string>) {
    if (params) {
      url += `?${new URLSearchParams(params).toString()}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json() as T;
  }
}
