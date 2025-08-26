import { NextResponse } from "next/server";

const CREDENTIAL = {
  email: "teste@teste.com",
  password: "123",
};

export async function POST(request: NextResponse) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email e senha são obrigatórios." },
      { status: 400 }
    );
  }

  if (email === CREDENTIAL.email && password === CREDENTIAL.password) {
    // Se a autenticação for bem-sucedida, você pode retornar um token ou uma resposta de sucesso
    return NextResponse.json(
      { message: "Login bem-sucedido!" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=mocked_token; Path=/; HttpOnly`,
        },
      }
    );
  }

  return NextResponse.json(
    { error: "Credenciais inválidas." },
    { status: 401 }
  );
}
