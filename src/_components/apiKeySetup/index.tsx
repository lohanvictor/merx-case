"use client";

import { Key } from "lucide-react";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API_KEY_COOKIE_NAME } from "@/_constants";
import { DropdownTip } from "../dropdownTip";

type Props = {
  apiKey: string;
};

export default function ApiKeySetup(props: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const apiKeyInputRef = useRef<string>("");
  const router = useRouter();

  function handleApiKey() {
    if (apiKeyInputRef.current) {
      Cookies.set(API_KEY_COOKIE_NAME, apiKeyInputRef.current);
      setIsEdit(false);
      router.refresh();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleApiKey();
    }
  }

  function handleRemoveApiKey() {
    Cookies.remove(API_KEY_COOKIE_NAME);
    router.refresh();
  }

  if (!props.apiKey || isEdit) {
    return (
      <div className="flex flex-col gap-2">
        <section className="w-full border bg-blue-50 border-blue-300 p-8 py-6 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3 text-blue-700">
          <Key className="sm:block hidden" />
          <span className="text-lg font-medium text-center sm:text-left">
            {isEdit ? "Edite sua API Key" : "API Key não está definida"}
          </span>
          <form className="sm:ml-auto gap-2 flex flex-col sm:flex-row sm:items-center">
            <input
              type="text"
              name="apiKey"
              placeholder="Insira sua API Key"
              className="p-2 border rounded-md border-gray-300 bg-white text-gray-600"
              defaultValue={props.apiKey}
              onChange={(e) => (apiKeyInputRef.current = e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleApiKey}
              className="text-base font-medium bg-white hover:cursor-pointer text-gray-900 border rounded-md border-gray-300 p-2"
            >
              Salvar
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="text-base font-medium bg-white hover:cursor-pointer text-gray-900 border rounded-md border-gray-300 p-2"
              >
                Voltar
              </button>
            )}
          </form>
        </section>
        <div className="flex justify-end">
          <DropdownTip
            position="right"
            title="Dica para API Key"
            customClasses="w-80 sm:w-[500px]"
          >
            <div className="p-4 bg-gray-100 border border-gray-300 rounded">
              <span className="font-semibold mb-2">
                Caso não possua API Key da CommodityAPI, inserir API Key de
                dados mockados:
              </span> {' '}
              <span>MOCK_API_KEY</span>
            </div>
          </DropdownTip>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full border bg-blue-50 border-blue-300 p-8 py-6 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3 text-blue-700">
      <Key className="sm:block hidden" />
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
