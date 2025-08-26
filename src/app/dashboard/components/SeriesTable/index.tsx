"use client";
import GenericTable, { GenericTableColumn } from "@/_components/genericTable";
import { DashboardUtils } from "../../utils";

export type SeriesTableData = {
  date: string;
  dollar: string;
  wheat: string;
  soy: string;
};

type Props = {
  data: SeriesTableData[];
};

export default function SeriesTable({ data }: Props) {
  const columns: GenericTableColumn<SeriesTableData>[] = [
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
      render: (item) => "$ " + item.soy,
    },
    {
      key: "wheat",
      label: "Trigo",
      sortable: true,
      render: (item) => "$ " + item.wheat,
    },
    {
      key: "dollar",
      label: "USD/BRL",
      sortable: true,
      render: (item) => "R$ " + item.dollar,
    },
  ];
  return <GenericTable data={data} columns={columns} />;
}
