import Header from "@/_components/header";
import { redirect } from "next/navigation";
import { LoginService } from "./service";
import { cookies } from "next/headers";
import { EMAIL_COOKIE_NAME, TOKEN_COOKIE_NAME, USER_COOKIE_NAME } from "@/_constants";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage(props: Props) {
  const params = await props.searchParams;
  async function handleSubmit(form: FormData) {
    "use server";
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      return;
    }

    const response = await LoginService.login(
      email.toString(),
      password.toString()
    );
    if (response) {
      const cookie = await cookies();
      cookie.set(TOKEN_COOKIE_NAME, response.token);
      cookie.set(USER_COOKIE_NAME, response.name);
      cookie.set(EMAIL_COOKIE_NAME, email.toString());
      redirect("/dashboard?periodo=7_DAYS");
    } else {
      redirect("/login?error=invalid_credentials");
    }
  }

  return (
    <div className="w-full flex flex-col">
      <Header
        title="Login"
        subtitle="Preencha os dados abaixo para logar no sistema."
      />
      <main className="w-full flex-1">
        <form action={handleSubmit} className="p-4 flex-col flex gap-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label htmlFor="password" className="font-semibold">
            Senha
          </label>
          <input
            type="password"
            placeholder="Senha"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:cursor-pointer"
          >
            Entrar
          </button>
          {params.error === "invalid_credentials" && (
            <p className="text-red-500 text-right">Credenciais inválidas.</p>
          )}
        </form>
      </main>
    </div>
  );
}
