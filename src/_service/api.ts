export class ApiService {
  static async get<T = unknown>(url: string, params?: Record<string, string>) {
    if (params) {
      url += `?${new URLSearchParams(params).toString()}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json() as T;
  }

  static async post<T = unknown>(url: string, data: unknown) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json() as T;
  }
}
