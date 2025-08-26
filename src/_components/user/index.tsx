import { CircleUserRound } from "lucide-react";
import Cookies from "js-cookie";
import { useMemo } from "react";

export default function User() {
  const [name, email] = useMemo(() => {
    return [Cookies.get("name"), Cookies.get("email")];
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="bg-green-600 rounded-full">
        <CircleUserRound size={32} strokeWidth={1} className="text-white" />
      </div>

      <div className="flex flex-col text-sm gap-[1px]">
        <h4 className="text-gray-900 font-semibold">{name}</h4>
        <span className="text-xs text-gray-600 font-medium">{email}</span>
      </div>
    </div>
  );
}
