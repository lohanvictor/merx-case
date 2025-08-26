import Header from "@/_components/header";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Merx Tech",
  description: "Dashboard Agrícola",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full h-full bg-white overflow-y-auto">
      <Header
        title="Dashboard Agrícola"
        subtitle="Monitoramento de Commodities em Tempo Real"
      />
      {children}
    </div>
  );
}
