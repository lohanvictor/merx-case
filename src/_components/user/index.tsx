import { CircleUserRound } from "lucide-react";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { EMAIL_COOKIE_NAME, USER_COOKIE_NAME } from "@/_constants";

export default function User() {
  const [name, email] = useMemo(() => {
    return [Cookies.get(USER_COOKIE_NAME), Cookies.get(EMAIL_COOKIE_NAME)];
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
