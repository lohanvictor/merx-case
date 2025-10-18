"use client";

import { PeriodFilter } from "@/_service/commodityApi";
import { useRouter } from "next/navigation";

type Props = {
  periodo: PeriodFilter;
};

export default function FilterSelect(props: Props) {
  const route = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value as PeriodFilter;
    route.push("/dashboard?periodo=" + selectedValue);
  }

  return (
    <select
      name="periodo"
      defaultValue={props.periodo || "7_DAYS"}
      className="border border-gray-300 rounded-md p-2"
      onChange={handleChange}
    >
      <option value="7_DAYS">Últimos 7 dias</option>
      <option value="30_DAYS">Últimos 30 dias</option>
      <option value="90_DAYS">Últimos 90 dias</option>
    </select>
  );
}
