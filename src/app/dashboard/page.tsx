import AmountCard from "@/_components/amountCard";
import GenericTable, { GenericTableColumn } from "@/_components/genericTable";
import Header from "@/_components/header";
import { DollarSign, TrendingUp, Wheat, Wifi } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center w-full h-full bg-white overflow-y-auto">
      <Header
        title="Dashboard Agrícola"
        subtitle="Monitoramento de Commodities em Tempo Real"
      />
      <main className="p-6 w-full flex flex-col gap-3 sm:gap-6">
        <section className="w-full border bg-green-50 border-green-300 p-8 py-6 rounded-lg flex items-center gap-3 text-green-700">
          <Wifi />
          <span className="text-lg font-medium">Dados atualizados - Próxima atualização em 5 segundos</span>
        </section>

        <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-6">
          <AmountCard
            label="Soja"
            icon={{
              element: Wheat,
              className: "text-green-600",
            }}
            containerClassname="bg-green-50 border-green-200"
            amount="$ 23,00"
            etf
            date="23/03/2025"
            percentage={-3.23}
          />
          <AmountCard
            label="Milho"
            icon={{
              element: TrendingUp,
              className: "text-yellow-600",
            }}
            containerClassname="bg-yellow-50 border-yellow-200"
            amount="$ 23,00"
            etf
            date="23/03/2025"
            percentage={-3.23}
          />
          <AmountCard
            label="USD/BRL"
            icon={{
              element: DollarSign,
              className: "text-blue-600",
            }}
            containerClassname="bg-blue-50 border-blue-200"
            amount="R$ 23,00"
            date="23/03/2025"
            percentage={3.23}
          />
        </section>

        <section className="w-full p-6 shadow border rounded-lg border-gray-300 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-900">
              Dados históricos
            </h2>

            <div className="flex gap-3 items-center justify-between w-full sm:w-fit">
              <span className="text-gray-600 font-semibold">Período:</span>
              <select
                name="periodo"
                id="periodo"
                className="border-3 border-gray-300 rounded-md p-2"
              >
                <option value="2025">Últimos 7 dias</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          <GenericTable data={mockData} columns={columns} />
        </section>
      </main>
    </div>
  );
}

const mockData = [
  {
    date: "2023-01-01",
    soja: 23.5,
    milho: 12.3,
    usdbrl: 5.2,
  },
  {
    date: "2023-01-02",
    soja: 23.5,
    milho: 12.3,
    usdbrl: 5.2,
  },
  {
    date: "2024-01-01",
    soja: 23.5,
    milho: 12.3,
    usdbrl: 5.2,
  },
];

const columns: GenericTableColumn<(typeof mockData)[0]>[] = [
  {
    key: "date",
    label: "Data",
    sortable: true,
  },
  {
    key: "soja",
    label: "Soja",
  },
  {
    key: "milho",
    label: "Milho",
  },
  {
    key: "usdbrl",
    label: "USD/BRL",
  },
];
