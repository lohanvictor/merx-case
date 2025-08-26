import Navbar from "@/_components/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row w-dvw h-dvh">
      <Navbar section="public" />
      {children}
    </div>
  );
}
