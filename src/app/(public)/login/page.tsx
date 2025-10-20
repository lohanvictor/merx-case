import Header from "@/_components/header";
import { redirect } from "next/navigation";
import { LoginService } from "./service";
import { cookies } from "next/headers";
import {
  EMAIL_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
  USER_COOKIE_NAME,
} from "@/_constants";
import { DropdownTip } from "@/_components/dropdownTip";

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
      <main className="w-full p-4 flex flex-col gap-2">
        <form action={handleSubmit} className="flex-col flex gap-2">
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
        <div className="flex justify-end">
          <DropdownTip
            position="right"
            title="Dica para login"
            customClasses="w-80"
          >
            <div className="p-4 bg-gray-100 border border-gray-300 rounded">
              <p className="font-semibold mb-2">Use as credenciais abaixo:</p>
              <p>Email: teste@teste.com</p>
              <p>Senha: 123</p>
            </div>
          </DropdownTip>
        </div>
      </main>
    </div>
  );
}
