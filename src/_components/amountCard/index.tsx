import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
  label: string;
  icon: {
    element: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    className: string;
  };
  containerClassname: string;
  amount: string;
  etf?: boolean;
  date: string;
  percentage: number;
};

export default function AmountCard(props: Props) {
  return (
    <div
      className={`border-3 rounded-lg p-6 shadow-xs ${props.containerClassname} flex flex-col w-full gap-1`}
    >
      <div className="flex justify-between">
        <span className="text-lg 2xl:text-xl font-bold text-gray-900">
          {props.label}
        </span>
        <props.icon.element size={28} className={props.icon.className} />
      </div>
      <div className="">
        <span className="text-3xl font-bold text-gray-900">{props.amount}</span>
        {props.etf && (
          <span className="text-gray-600 font-semibold text-base uppercase tracking-wider">
            /etf
          </span>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-base font-medium">
          {props.date}
        </span>

        <span
          className={`inline-flex items-center justify-center px-2 py-1 text-base font-medium rounded-full ${
            props.percentage > 0
              ? "text-green-800 bg-green-100"
              : "text-red-800 bg-red-100"
          }`}
        >
          {props.percentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
