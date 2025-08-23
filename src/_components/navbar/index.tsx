"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV_SECTIONS } from "./constants";
import { Menu, X } from "lucide-react";
import Logo from "../logo";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
        className={`flex flex-col gap-4 w-full bg-gray-100 h-full sm:block ${
          isOpen ? "block sm:h-full" : "hidden"
        }`}
      >
        {NAV_SECTIONS.map((section) => (
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
      </div>
    </nav>
  );
}
