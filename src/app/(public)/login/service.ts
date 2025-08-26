import { ApiService } from "@/_service/api";

export class LoginService {
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
