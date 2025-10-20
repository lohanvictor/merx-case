"use client";

import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  position: "left" | "right";
  title: string;
  customClasses?: string;
}>;

export function DropdownTip(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const childrenClasses = props.position === "right" ? "right-0" : "left-0";

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="border-1 rounded-md border-gray-500 py-2 px-4 cursor-pointer relative bg-white"
    >
      <span className="text-md text-text-gray-500">{props.title}</span>
      {isOpen && (
        <div
          className={`absolute ${childrenClasses} top-[44px] ${props.customClasses}`}
        >
          {props.children}
        </div>
      )}
    </button>
  );
}
