export class ApiService {
  /**
   * Faz uma requisição GET para a API.
   * @param url A URL da API.
   * @param params Os parâmetros da requisição. É um objeto contendo pares chave-valor.
   * @returns Os dados da resposta da API.
   */
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

  /**
   * Faz uma requisição POST para a API.
   * 
   * @param url A URL da API.
   * @param data Os dados a serem enviados no corpo da requisição.
   * @returns Os dados da resposta da API.
   */
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
