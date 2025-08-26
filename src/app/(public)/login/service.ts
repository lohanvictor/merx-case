import { ApiService } from "@/_service/api";

export class LoginService {
  /**
   * Faz uma requisição de login para a API Route handler.
   *
   * @param email O email do usuário.
   * @param password A senha do usuário.
   * @returns O token de autenticação.
   */
  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; name: string } | null> {
    const baseUrl = ApiService.baseInternalUrl();

    try {
      const response = await ApiService.post<{ token: string; name: string }>(
        `${baseUrl}/api/login`,
        {
          email,
          password,
        }
      );
      return {
        token: response.token,
        name: response.name,
      };
    } catch {
      return null;
    }
  }
}
