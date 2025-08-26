import Header from "@/_components/header";
import { ApiService } from "@/_service/api";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function handleSubmit(form: FormData) {
    "use server";
    const email = form.get("email");
    const password = form.get("password");

    await ApiService.post("/api/login", {
      email,
      password,
    });
    redirect("/dashboard?periodo=7_DAYS");
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
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
