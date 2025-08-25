"use client";

import { Key } from "lucide-react";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  apiKey: string;
};

export default function ApiKeySetup(props: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const apiKeyInputRef = useRef<string>("");
  const router = useRouter();

  function handleApiKey() {
    if (apiKeyInputRef.current) {
      Cookies.set("apiKey", apiKeyInputRef.current);
      setIsEdit(false);
      router.refresh();
    }
  }

  function handleRemoveApiKey() {
    Cookies.remove("apiKey");
    router.refresh();
  }

  if (!props.apiKey || isEdit) {
    return (
      <section className="w-full border bg-blue-50 border-blue-300 p-8 py-6 rounded-lg flex items-center gap-3 text-blue-700">
        <Key />
        <span className="text-lg font-medium">
          {isEdit ? "Edite sua API Key" : "API Key não está definida"}
        </span>
        <form className="ml-auto flex gap-2">
          <input
            type="text"
            name="apiKey"
            placeholder="Insira sua API Key"
            className="p-2 border rounded-md border-gray-300 bg-white text-gray-600"
            defaultValue={props.apiKey}
            onChange={(e) => (apiKeyInputRef.current = e.target.value)}
          />
          <button
            type="button"
            onClick={handleApiKey}
            className="text-base font-medium bg-white hover:cursor-pointer text-gray-900 border rounded-md border-gray-300 p-2"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => setIsEdit(false)}
            className="text-base font-medium bg-white hover:cursor-pointer text-gray-900 border rounded-md border-gray-300 p-2"
          >
            Voltar
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="w-full border bg-blue-50 border-blue-300 p-8 py-6 rounded-lg flex items-center gap-3 text-blue-700">
      <Key />
      <span className="text-lg font-medium">
        API Key configurada para dados reais
      </span>

      <div className="ml-auto flex gap-2 items-center">
        <button
          onClick={() => setIsEdit(true)}
          className="text-base font-medium bg-white hover:cursor-pointer text-gray-900 border rounded-md border-gray-300 p-2"
        >
          Editar
        </button>
        <button
          onClick={handleRemoveApiKey}
          className="text-base font-medium bg-white hover:cursor-pointer text-gray-900 border rounded-md border-gray-300 p-2"
        >
          Remover
        </button>
      </div>
    </section>
  );
}
