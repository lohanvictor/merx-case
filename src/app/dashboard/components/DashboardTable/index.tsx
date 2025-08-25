"use client";
import GenericTable, { GenericTableColumn } from "@/_components/genericTable";
import { DashboardUtils } from "../../utils";

export type DashboardTableData = {
  date: string;
  dollar: string;
  wheat: string;
  soy: string;
};

type Props = {
  data: DashboardTableData[];
};

export default function DashboardTable({ data }: Props) {
  const columns: GenericTableColumn<DashboardTableData>[] = [
    {
      key: "date",
      label: "Data",
      sortable: true,
      render: (item) => DashboardUtils.formatDate(item.date),
    },
    {
      key: "soy",
      label: "Soja",
      sortable: true,
    },
    {
      key: "wheat",
      label: "Trigo",
      sortable: true,
    },
    {
      key: "dollar",
      label: "USD/BRL",
      sortable: true,
    },
  ];
  return <GenericTable data={data} columns={columns} />;
}
