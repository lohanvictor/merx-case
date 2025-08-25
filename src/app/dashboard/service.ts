import { ApiService } from "@/_service/api";
import { cookies } from "next/headers";
import { DashboardUtils } from "./utils";

export type PeriodFilter = "7_DAYS" | "30_DAYS" | "90_DAYS";

type Filters = {
  period: PeriodFilter;
  symbol: string;
  mapper(value: any): string;
};

export type DashboardTimeSerie = {
  date: string;
  value: string;
};

export class DashboardService {
  static async getCommodityBalanceTimeSeries(
    filters: Filters
  ): Promise<DashboardTimeSerie[]> {
    const apiKey = (await cookies()).get("apiKey");
    if (!apiKey) throw new Error("API Key is required");

    const { startDate, endDate } = DashboardUtils.formatFilterDate(
      filters.period
    );

    const response = await ApiService.get<CommodityTimeSeriesResponse>(
      "https://commodities-api.com/api/timeseries",
      {
        base: "USD",
        symbols: filters.symbol,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        access_key: apiKey.value,
      }
    );

    return DashboardUtils.commodityBalanceToTimeSeries(
      response,
      filters.mapper
    );
  }
}

export type CommodityTimeSeriesResponse = {
  data: {
    success: boolean;
    timeseries: boolean;
    start_date: Date;
    end_date: Date;
    base: string;
    rates: Record<string, any>;
  };
};
