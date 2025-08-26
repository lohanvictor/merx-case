"use client";

import { API_KEY_COOKIE_NAME } from "@/_constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type Props = {
  code: number;
};

const apiErrorMessage: Record<number, string[]> = {
  429: [
    "O número de requisições foi excedido.",
    "Tente inserir uma nova API Key na tela de Dashboard.",
  ],
  104: [
    "O número de requisições mensais foi excedido.",
    "Espere um momento e tente novamente ou tente inserir uma nova API Key na tela de Dashboard.",
  ],
  401: [
    "A API Key fornecida é inválida.",
    "Tente novamente inserindo uma nova API Key.",
  ],
};

export default function ErrorPage({ code }: Props) {
  const route = useRouter();
  const [mainMessage, subtitle] = useMemo(
    () =>
      apiErrorMessage[code] || ["Erro interno.", "Tente novamente mais tarde"],
    [code]
  );

  function handleReset() {
    if (code !== 500) {
      Cookies.remove(API_KEY_COOKIE_NAME);
    }
    route.refresh();
  }
  return (
    <section className="w-full p-4">
      <div className="flex flex-col gap-2 border rounded-lg p-4 bg-gray-100">
        <p className="text-2xl font-extralight text-gray-800">
          {mainMessage}
          <br />
          <span className="text-lg font-bold text-gray-900">{subtitle}</span>
        </p>

        <button
          onClick={handleReset}
          className="p-2 border rounded text-gray-900 bg-white border-gray-400 hover:cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    </section>
  );
}
