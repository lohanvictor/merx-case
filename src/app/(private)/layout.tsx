import Navbar from "@/_components/navbar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row w-dvw h-dvh">
      <Navbar section="private" />
      {children}
    </div>
  );
}
