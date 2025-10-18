import { ApiService } from "@/_service/api";
import { cookies } from "next/headers";
import { API_KEY_COOKIE_NAME } from "@/_constants";
import { DashboardUtils } from "@/app/(private)/dashboard/utils";

export type CommodityTimeSeriesResponse = {
  data: {
    success: boolean;
    timeseries: boolean;
    start_date: Date;
    end_date: Date;
    base: string;
    rates: Record<string, unknown>;
  };
};

export type PeriodFilter = "7_DAYS" | "30_DAYS" | "90_DAYS";

export type CommodityFilters = {
  period: PeriodFilter;
  symbol: string;
  mapper(value: unknown): string;
};

export type CommodityApiError = {
  success: false;
  error: { code: number; type: string; info: string };
};

export class CommodityApi {
  /**
   * Obtém a série temporal de saldo de uma commodity.
   *
   * @param filters Os filtros a serem aplicados na busca.
   * @example
   * ```typescript
   * {
   *   period: "7_DAYS",
   *   symbol: "BRL",
   *   mapper: (value) => value.BRL.toFixed(2),
   * }
   * ```
   * @returns Uma _promise_ com os dados da série temporal.
   */
  static async getCommodityBalanceTimeSeries(
    filters: CommodityFilters
  ): Promise<CommodityTimeSeriesResponse> {
    const apiKey = (await cookies()).get(API_KEY_COOKIE_NAME);
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
    return response;
  }

  /**
   * Verifica se um erro é um erro da API de commodities.
   *
   * @param error O erro a ser verificado.
   * @returns Um _boolean_ indicando se o erro é da API de commodities. A variável de erro fica com o tipo `CommodityApiError`.
   */
  static isError(error: unknown): error is CommodityApiError {
    return (
      typeof error === "object" &&
      error !== null &&
      "success" in error &&
      error.success === false &&
      "error" in error &&
      typeof error.error === "object" &&
      error.error !== null &&
      "code" in error.error &&
      "type" in error.error &&
      "info" in error.error
    );
  }
}
