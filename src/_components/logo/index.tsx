import { Wheat } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="w-12 h-12 flex justify-center items-center bg-green-600 rounded-lg">
        <Wheat size={28} color="#fff" />
      </div>
      <h1 className="text-gray-900 text-xl 2xl:text-2xl font-extrabold">AgroData</h1>
    </div>
  );
}
