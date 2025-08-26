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

export const PRIVATE_NAV_SECTIONS: NavSection[] = [
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

export const PUBLIC_NAV_SECTIONS: NavSection[] = [
  {
    title: "Navegação Pública",
    items: [
      { label: "Página Inicial", href: "/", icon: House },
      { label: "Login", href: "/login", icon: Users },
    ],
  },
];
