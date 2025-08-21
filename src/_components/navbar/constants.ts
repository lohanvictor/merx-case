import {
  ChartColumn,
  DollarSign,
  House,
  LucideProps,
  Settings,
  TrendingUp,
  Users,
  Wheat,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Navegação Principal",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: House },
      { label: "Commodities", href: "/commodities", icon: Wheat },
      { label: "Análise", href: "/analysis", icon: TrendingUp },
      { label: "Relatórios", href: "/reports", icon: ChartColumn },
      { label: "Câmbio", href: "/exchange", icon: DollarSign },
    ],
  },
  {
    title: "Gerenciamento",
    items: [
      { label: "Usuários", href: "/users", icon: Users },
      { label: "Configurações", href: "/settings", icon: Settings },
    ],
  },
];
