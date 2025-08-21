import { Wheat } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="w-10 h-10 flex justify-center items-center bg-[#16a349] rounded-sm">
        <Wheat size={24} color="#fff" />
      </div>
      <h1 className="text-[#24242f] text-2xl font-semibold">AgroData</h1>
    </div>
  );
}
