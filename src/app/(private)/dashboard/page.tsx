import {
  DashboardService,
  DashboardTimeSerie,
  mockDashboardData,
} from "./service";
import { cookies } from "next/headers";
import ErrorPage from "./components/ErrorPage";
import { API_KEY_COOKIE_NAME, MOCK_API_KEY } from "@/_constants";
import { CommodityApi, PeriodFilter } from "@/_service/commodityApi";
import { DashboardList } from "./components/DashboardList";
import ApiKeySetup from "@/_components/apiKeySetup";

type Props = {
  searchParams: Promise<{ periodo?: PeriodFilter }>;
};

export default async function DashboardPage(props: Props) {
  const params = await props.searchParams;
  const apiKey = (await cookies()).get(API_KEY_COOKIE_NAME);

  // Define variáveis para armazenar os dados das séries temporais
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
    if (apiKey.value === MOCK_API_KEY)
      return (
        <DashboardList
          apiKey={MOCK_API_KEY}
          dollarBalance={mockDashboardData.dollarBalance}
          soyBalance={mockDashboardData.soyBalance}
          wheatBalance={mockDashboardData.wheatBalance}
          zipBalances={mockDashboardData.zipBalances}
          periodo={params.periodo}
        />
      );

    try {
      // Busca os dados das séries temporais para Dollar, Trigo e Soja
      const [_dollarBalance, _wheatBalance, _soyBalance] =
        await DashboardService.getCommoditiesBalanceTimeSeries([
          {
            period: params.periodo || "7_DAYS",
            symbol: "BRL",
            mapper: (value: { BRL: number }) => value.BRL.toFixed(2),
          },
          {
            period: params.periodo || "7_DAYS",
            symbol: "WHEAT",
            mapper: (value: { WHEAT: number }) =>
              (value.WHEAT * 1000).toFixed(2),
          },
          {
            period: params.periodo || "7_DAYS",
            symbol: "SM00",
            mapper: (value: { SM00: number }) => (value.SM00 * 1000).toFixed(2),
          },
        ]);

      // Atribui os dados das séries temporais às variáveis correspondentes
      dollarBalance = _dollarBalance;
      wheatBalance = _wheatBalance;
      soyBalance = _soyBalance;

      // Cria um zip das variáveis
      zipBalances = dollarBalance.map((dollarItem, index) => ({
        date: dollarItem.date,
        dollar: dollarItem.value,
        wheat: wheatBalance ? wheatBalance[index]?.value : "-",
        soy: soyBalance ? soyBalance[index]?.value : "-",
      }));
      return (
        <DashboardList
          dollarBalance={dollarBalance}
          wheatBalance={wheatBalance}
          soyBalance={soyBalance}
          zipBalances={zipBalances}
          apiKey={apiKey.value}
          periodo={params.periodo}
        />
      );
    } catch (error: unknown) {
      // Caso ocorra um erro durante a requisição, é exibido um componente de erro
      if (CommodityApi.isError(error)) {
        const { code } = error.error;

        return <ErrorPage code={code} />;
      }
      return <ErrorPage code={500} />;
    }
  }
  return (
    <main className="p-6 w-full flex flex-col gap-3 sm:gap-6">
      <ApiKeySetup apiKey={apiKey || ""} />
    </main>
  );
}
