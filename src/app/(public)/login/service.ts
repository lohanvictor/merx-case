import { ApiService } from "@/_service/api";

export class LoginService {
  /**
   * Faz uma requisição de login para a API Route handler.
   * 
   * @param email O email do usuário.
   * @param password A senha do usuário.
   * @returns O token de autenticação.
   */
  static async post(email: string, password: string): Promise<string> {
    try {
      const response = await ApiService.post<{ token: string }>(
        `${process.env.URL}/api/login`,
        {
          email,
          password,
        }
      );
      return response.token;
    } catch {
      return "";
    }
  }
}
