import { NextRequest, NextResponse } from "next/server";

const CREDENTIAL = {
  email: "teste@teste.com",
  password: "123",
};

export async function POST(request: NextRequest) {
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
      { token: 'mocked_token' },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    { error: "Credenciais inválidas." },
    { status: 401 }
  );
}
