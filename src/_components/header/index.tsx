type Props = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: Props) {
  return (
    <header className="text-white p-6 border-b-[1px] border-gray-400 w-full">
      <h2 className="text-2xl font-bold text-[#111827]">{title}</h2>
      <span className="text-lg text-[#6a7280]">{subtitle}</span>
    </header>
  );
}
