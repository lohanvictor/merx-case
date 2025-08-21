export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Navegação Principal",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: null },
      { label: "Commodities", href: "/commodities", icon: null },
      { label: "Análise", href: "/analysis", icon: null },
      { label: "Relatórios", href: "/reports", icon: null },
      { label: "Câmbio", href: "/exchange", icon: null },
    ],
  },
  {
    title: 'Gerenciamento',
    items: [
      { label: "Usuários", href: "/users", icon: null },
      { label: "Configurações", href: "/settings", icon: null },
    ],
  }
];
