"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {
  code: number;
};

const apiErrorMessage: Record<number, string> = {
  429: "O número de requisições foi excedido. Tente inserir uma nova API Key na tela de Dashboard.",
  104: "O número de requisições mensais foi excedido. Espere um momento e tente novamente ou tente inserir uma nova API Key na tela de Dashboard.",
  401: "A API Key fornecida é inválida. Tente novamente inserindo uma nova API Key.",
};

export default function ErrorPage({ code }: Props) {
  const route = useRouter();

  function handleReset() {
    if (code !== 500) {
      Cookies.remove("apiKey");
    }
    route.refresh();
  }
  return (
    <div className="w-full p-4 gap-2 flex flex-col">
      <p className="text-2xl font-medium text-gray-800">
        {apiErrorMessage[code] || "Error interno. Tente novamente mais tarde."}
      </p>

      <button
        onClick={handleReset}
        className="p-2 border rounded text-gray-900 bg-white border-gray-400 hover:cursor-pointer"
      >
        Tentar novamente
      </button>
    </div>
  );
}
