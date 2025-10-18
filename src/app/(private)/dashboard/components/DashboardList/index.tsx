import ApiKeySetup from "@/_components/apiKeySetup";
import { DashboardTimeSerie } from "../../service";
import AmountCard from "@/_components/amountCard";
import { DollarSign, TrendingUp, Wheat } from "lucide-react";
import { ArrayUtils } from "@/_utils/ArrayUtils";
import { DashboardUtils } from "../../utils";
import FilterSelect from "../FilterSelect";
import { PeriodFilter } from "@/_service/commodityApi";
import SeriesTable from "../SeriesTable";

type Props = {
  dollarBalance: DashboardTimeSerie[];
  wheatBalance: DashboardTimeSerie[];
  soyBalance: DashboardTimeSerie[];
  zipBalances: Array<{
    date: string;
    dollar: string;
    wheat: string;
    soy: string;
  }>;
  apiKey: string;
  periodo?: PeriodFilter;
};

export function DashboardList({
  dollarBalance,
  wheatBalance,
  soyBalance,
  zipBalances,
  apiKey,
  periodo,
}: Props) {
  return (
    <main className="p-6 w-full flex flex-col gap-3 sm:gap-6">
      <ApiKeySetup apiKey={apiKey || ""} />

      <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-6">
        <AmountCard
          label="Soja"
          icon={{
            element: Wheat,
            className: "text-green-600",
          }}
          containerClassname="bg-green-50 border-green-200"
          amount={
            soyBalance ? "$ " + ArrayUtils.lastItem(soyBalance).value : ""
          }
          etf
          date={DashboardUtils.formatDate(ArrayUtils.lastItem(soyBalance).date)}
          percentage={DashboardUtils.getPercentage(soyBalance)}
        />
        <AmountCard
          label="Milho"
          icon={{
            element: TrendingUp,
            className: "text-yellow-600",
          }}
          containerClassname="bg-yellow-50 border-yellow-200"
          amount={
            wheatBalance ? "$ " + ArrayUtils.lastItem(wheatBalance).value : ""
          }
          etf
          date={DashboardUtils.formatDate(
            ArrayUtils.lastItem(wheatBalance).date
          )}
          percentage={DashboardUtils.getPercentage(wheatBalance)}
        />
        <AmountCard
          label="USD/BRL"
          icon={{
            element: DollarSign,
            className: "text-blue-600",
          }}
          containerClassname="bg-blue-50 border-blue-200"
          amount={
            dollarBalance
              ? "R$ " + ArrayUtils.lastItem(dollarBalance).value
              : ""
          }
          date={DashboardUtils.formatDate(
            ArrayUtils.lastItem(dollarBalance).date
          )}
          percentage={DashboardUtils.getPercentage(dollarBalance)}
        />
      </section>

      <section className="w-full p-6 shadow border rounded-lg border-gray-300 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-900">
            Dados históricos
          </h2>

          <div className="flex gap-3 items-center justify-between w-full sm:w-fit">
            <span className="text-gray-600 font-semibold">Período:</span>
            <FilterSelect periodo={periodo || "7_DAYS"} />
          </div>
        </div>

        <SeriesTable data={zipBalances} />
      </section>
    </main>
  );
}
