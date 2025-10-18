import { ArrayUtils } from "@/_utils/ArrayUtils";
import { DashboardTimeSerie } from "./service";
import {
  CommodityTimeSeriesResponse,
  PeriodFilter,
} from "@/_service/commodityApi";

export class DashboardUtils {
  /**
   * Converte a resposta da API de commodities em uma série temporal.
   *
   * @param data A resposta da API de commodities.
   * @param mapper A função de mapeamento a ser aplicada aos valores.
   * @returns Uma série temporal de dados formatados.
   */
  static commodityBalanceToTimeSeries(
    data: CommodityTimeSeriesResponse,
    mapper: (value: unknown) => string
  ): DashboardTimeSerie[] {
    return Object.entries(data.data.rates).map<DashboardTimeSerie>(
      ([date, rates]) => {
        return {
          date,
          value: mapper(rates),
        };
      }
    );
  }

  /**
   * Formata as datas de início e fim com base no período selecionado.
   *
   * @param period O período selecionado.
   * @returns Um objeto contendo as datas de início e fim.
   */
  static formatFilterDate(period: PeriodFilter): {
    startDate: Date;
    endDate: Date;
  } {
    const endDate = new Date();
    const startDate = new Date(endDate);

    switch (period.toLowerCase()) {
      case "30_days":
        startDate.setDate(endDate.getDate() - 30);
        return { startDate, endDate };
      case "90_days":
        startDate.setDate(endDate.getDate() - 90);
        return { startDate, endDate };
      case "7_days":
      default:
        startDate.setDate(endDate.getDate() - 7);
        return { startDate, endDate };
    }
  }

  /**
   * Calcula a variação percentual entre o primeiro e o último valor de uma série temporal.
   *
   * @param series A série temporal a ser analisada.
   * @returns A variação percentual entre o primeiro e o último valor.
   */
  static getPercentage(series: DashboardTimeSerie[]): number {
    if (series.length < 2) return 0;

    const [first, last] = [
      ArrayUtils.firstItem(series),
      ArrayUtils.lastItem(series),
    ];
    const percentage =
      ((parseFloat(last.value) - parseFloat(first.value)) /
        parseFloat(first.value)) *
      100;
    return isNaN(percentage) ? 0 : percentage;
  }

  /**
   * Formata uma data no formato "YYYY-MM-DD" para "DD/MM/YYYY".
   */
  static formatDate(value: string): string {
    try {
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    } catch {
      return "-";
    }
  }
}
