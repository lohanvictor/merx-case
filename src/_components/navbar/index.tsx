"use client";

import Link from "next/link";
import { NAV_SECTIONS } from "./constants";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`border-r-[1px] border-gray-400 flex flex-col bg-[#fafafa] w-full sm:w-60 ${
        isOpen ? "h-dvh fixed" : ""
      }`}
    >
      <div className="p-5 border-b-[1px] border-gray-400 h-20 min-h-20 max-h-20 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button className="block sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      <div
        className={`flex flex-col gap-1 w-full bg-[#fafafa] h-full sm:block ${
          isOpen ? "block sm:h-full" : "hidden"
        }`}
      >
        {NAV_SECTIONS.map((section) => (
          <div className="p-2" key={section.title}>
            <h3 className="text-[#6a7280] uppercase tracking-wide font-semibold text-sm">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item) => (
                <li className="w-full" key={item.label}>
                  <Link
                    className={`block pl-2 w-full rounded-md hover:bg-[#f4f4f5] ${
                      pathname === item.href ? "bg-[#f4f4f5] font-semibold" : ""
                    }`}
                    href={item.href}
                  >
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
