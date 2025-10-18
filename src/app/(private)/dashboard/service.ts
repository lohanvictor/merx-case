import { CommodityApi, CommodityFilters } from "@/_service/commodityApi";
import { DashboardUtils } from "./utils";

export type DashboardTimeSerie = {
  date: string;
  value: string;
};

export class DashboardService {
  static async getCommoditiesBalanceTimeSeries(
    filters: CommodityFilters[]
  ): Promise<Array<DashboardTimeSerie[]>> {
    const fetchs = filters.map(CommodityApi.getCommodityBalanceTimeSeries);
    const series = await Promise.all(fetchs);
    return series.map((response, i) =>
      DashboardUtils.commodityBalanceToTimeSeries(response, filters[i].mapper)
    );
  }
}

export const mockDashboardData = {
  dollarBalance: [
    { date: "2025-10-09", value: "5.42" },
    { date: "2025-10-10", value: "5.38" },
    { date: "2025-10-11", value: "5.45" },
    { date: "2025-10-12", value: "5.41" },
    { date: "2025-10-13", value: "5.39" },
    { date: "2025-10-14", value: "5.43" },
    { date: "2025-10-15", value: "5.46" },
    { date: "2025-10-16", value: "5.44" },
    { date: "2025-10-17", value: "5.40" },
    { date: "2025-10-18", value: "5.37" },
  ] satisfies DashboardTimeSerie[],
  wheatBalance: [
    { date: "2025-10-09", value: "425.50" },
    { date: "2025-10-10", value: "428.75" },
    { date: "2025-10-11", value: "432.20" },
    { date: "2025-10-12", value: "429.80" },
    { date: "2025-10-13", value: "431.65" },
    { date: "2025-10-14", value: "434.10" },
    { date: "2025-10-15", value: "437.25" },
    { date: "2025-10-16", value: "435.90" },
    { date: "2025-10-17", value: "433.40" },
    { date: "2025-10-18", value: "430.85" },
  ] satisfies DashboardTimeSerie[],
  soyBalance: [
    { date: "2025-10-09", value: "985.30" },
    { date: "2025-10-10", value: "992.15" },
    { date: "2025-10-11", value: "997.80" },
    { date: "2025-10-12", value: "994.60" },
    { date: "2025-10-13", value: "989.45" },
    { date: "2025-10-14", value: "1002.70" },
    { date: "2025-10-15", value: "1008.25" },
    { date: "2025-10-16", value: "1005.90" },
    { date: "2025-10-17", value: "999.75" },
    { date: "2025-10-18", value: "996.40" },
  ] satisfies DashboardTimeSerie[],
  zipBalances: [
    { date: "2025-10-09", dollar: "5.42", wheat: "425.50", soy: "985.30" },
    { date: "2025-10-10", dollar: "5.38", wheat: "428.75", soy: "992.15" },
    { date: "2025-10-11", dollar: "5.45", wheat: "432.20", soy: "997.80" },
    { date: "2025-10-12", dollar: "5.41", wheat: "429.80", soy: "994.60" },
    { date: "2025-10-13", dollar: "5.39", wheat: "431.65", soy: "989.45" },
    { date: "2025-10-14", dollar: "5.43", wheat: "434.10", soy: "1002.70" },
    { date: "2025-10-15", dollar: "5.46", wheat: "437.25", soy: "1008.25" },
    { date: "2025-10-16", dollar: "5.44", wheat: "435.90", soy: "1005.90" },
    { date: "2025-10-17", dollar: "5.40", wheat: "433.40", soy: "999.75" },
    { date: "2025-10-18", dollar: "5.37", wheat: "430.85", soy: "996.40" },
  ] satisfies Array<{
    date: string;
    dollar: string;
    wheat: string;
    soy: string;
  }>,
};
