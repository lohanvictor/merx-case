"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import OptionalModal from "../optionalModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { TOKEN_COOKIE_NAME } from "@/_constants";

type Props = {
  classname?: string;
};

export default function LogoutButton({ classname }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const route = useRouter();

  const handleLogout = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    route.push("/login");
  };

  return (
    <>
      <button
        className={`px-4 py-2    flex items-center gap-2 border rounded border-gray-300 text-gray-600 bg-white hover:bg-gray-100 hover:cursor-pointer ${classname}`}
        onClick={() => setIsModalOpen(true)}
      >
        <LogOut size={20} /> <span className="font-medium text-sm">Logout</span>
      </button>
      {isModalOpen && (
        <OptionalModal
          cancelProps={{
            text: "Cancelar",
            onClick: () => setIsModalOpen(false),
          }}
          confirmProps={{
            text: "Sair",
            onClick: handleLogout,
          }}
          text="Tem certeza de que deseja sair?"
        />
      )}
    </>
  );
}
