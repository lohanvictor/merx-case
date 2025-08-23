import AmountCard from "@/_components/amountCard";
import Header from "@/_components/header";
import { DollarSign, TrendingUp, Wheat } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center w-full h-full bg-white">
      <Header
        title="Dashboard Agrícola"
        subtitle="Monitoramento de Commodities em Tempo Real"
      />
      <main className="p-6 w-full">
        <section className="w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-3 sm:gap-6">
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
      </main>
    </div>
  );
}
