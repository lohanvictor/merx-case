import { ArrayUtils } from "@/_utils/ArrayUtils";
import {
  DashboardTimeSerie,
  CommodityTimeSeriesResponse,
  PeriodFilter,
} from "./service";

export class DashboardUtils {
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

  static formatDate(value: string): string {
    try {
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    } catch {
      return "-";
    }
  }
}
