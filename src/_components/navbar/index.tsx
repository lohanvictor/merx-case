"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

import { PRIVATE_NAV_SECTIONS, PUBLIC_NAV_SECTIONS } from "./constants";
import Logo from "../logo";
import LogoutButton from "../logoutButton";
import User from "../user";
import { TOKEN_COOKIE_NAME } from "@/_constants";

type Props = {
  section: "public" | "private";
};

export default function Navbar({ section }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const sections = useMemo(() => {
    return section === "private" ? PRIVATE_NAV_SECTIONS : PUBLIC_NAV_SECTIONS;
  }, [section]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleNavigation(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav
      className={`border-r-[1px] border-gray-400 flex flex-col bg-gray-100 w-full sm:w-60 md:w-[400px] ${
        isOpen ? "h-dvh fixed" : ""
      }`}
    >
      <div className="p-5 border-b-[1px] border-gray-400 h-28 flex items-center justify-between">
        <Logo />
        <button className="block sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div
        className={`flex gap-4 w-full bg-gray-100 h-full flex-col sm:flex ${
          isOpen ? "flex sm:h-full" : "hidden"
        }`}
      >
        {sections.map((section) => (
          <div className="p-2 pr-0" key={section.title}>
            <h3 className="text-gray-500 uppercase tracking-wide font-bold text-sm mb-3">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li className="w-full" key={item.label}>
                  <Link
                    className={`flex items-center pl-3 py-2 pr-0 w-full rounded-md hover:bg-gray-200 text-gray-700 font-medium ${
                      pathname === item.href ? "bg-gray-200 font-semibold" : ""
                    }`}
                    href={item.href}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon
                      className="inline-block mr-4"
                      size={20}
                      strokeWidth={2}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {isAuthenticated && (
          <div className="mt-auto w-full flex flex-row justify-between items-center p-2 border-t border-gray-400">
            <User />
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
}
