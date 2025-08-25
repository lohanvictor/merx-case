import AmountCard from "@/_components/amountCard";
import GenericTable, { GenericTableColumn } from "@/_components/genericTable";
import Header from "@/_components/header";
import { DollarSign, TrendingUp, Wheat, Wifi } from "lucide-react";

import { DashboardService, DashboardTimeSerie, PeriodFilter } from "./service";
import ApiKeySetup from "@/_components/apiKeySetup";
import { cookies } from "next/headers";
import { ArrayUtils } from "@/_utils/ArrayUtils";
import { DashboardUtils } from "./utils";
import DashboardTable from "./components/DashboardTable";

type Props = {
  searchParams: Promise<{ periodo?: PeriodFilter }>;
};

export default async function DashboardPage(props: Props) {
  const params = await props.searchParams;
  const apiKey = (await cookies()).get("apiKey");

  let dollarBalance: DashboardTimeSerie[] | null = null;
  let wheatBalance: DashboardTimeSerie[] | null = null;
  let soyBalance: DashboardTimeSerie[] | null = null;
  let zipBalances: Array<{
    date: string;
    dollar: string;
    wheat: string;
    soy: string;
  }> | null = null;

  if (apiKey) {
    const [_dollarBalance, _wheatBalance, _soyBalance] = await Promise.all([
      DashboardService.getCommodityBalanceTimeSeries({
        period: params.periodo || "7_DAYS",
        symbol: "BRL",
        mapper: (value: { BRL: number }) => value.BRL.toFixed(2),
      }),
      DashboardService.getCommodityBalanceTimeSeries({
        period: params.periodo || "7_DAYS",
        symbol: "WHEAT",
        mapper: (value: { WHEAT: number }) => (value.WHEAT * 1000).toFixed(2),
      }),
      DashboardService.getCommodityBalanceTimeSeries({
        period: params.periodo || "7_DAYS",
        symbol: "SM00",
        mapper: (value: { SM00: number }) => (value.SM00 * 1000).toFixed(2),
      }),
    ]);
    dollarBalance = _dollarBalance;
    wheatBalance = _wheatBalance;
    soyBalance = _soyBalance;

    zipBalances = _dollarBalance.map((dollarItem, index) => ({
      date: dollarItem.date,
      dollar: dollarItem.value,
      wheat: wheatBalance ? wheatBalance[index]?.value : "-",
      soy: soyBalance ? soyBalance[index]?.value : "-",
    }));

    return (
      <div className="flex flex-col items-center w-full h-full bg-white overflow-y-auto">
        <Header
          title="Dashboard Agrícola"
          subtitle="Monitoramento de Commodities em Tempo Real"
        />

        <main className="p-6 w-full flex flex-col gap-3 sm:gap-6">
          <ApiKeySetup apiKey={apiKey?.value || ""} />

          {apiKey && wheatBalance && soyBalance && dollarBalance && (
            <>
              <section className="w-full border bg-green-50 border-green-300 p-8 py-6 rounded-lg flex items-center gap-3 text-green-700">
                <Wifi className="sm:block hidden" />
                <span className="text-lg font-medium">
                  Dados atualizados - Próxima atualização em 5 segundos
                </span>
              </section>

              <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-6">
                <AmountCard
                  label="Soja"
                  icon={{
                    element: Wheat,
                    className: "text-green-600",
                  }}
                  containerClassname="bg-green-50 border-green-200"
                  amount={
                    soyBalance
                      ? "$ " + ArrayUtils.lastItem(soyBalance).value
                      : ""
                  }
                  etf
                  date={DashboardUtils.formatDate(
                    ArrayUtils.lastItem(soyBalance).date
                  )}
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
                    wheatBalance
                      ? "$ " + ArrayUtils.lastItem(wheatBalance).value
                      : ""
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
                    <span className="text-gray-600 font-semibold">
                      Período:
                    </span>
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

                <DashboardTable data={zipBalances} />
              </section>
            </>
          )}
        </main>
      </div>
    );
  }
}
