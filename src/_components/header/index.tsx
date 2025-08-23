type Props = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: Props) {
  return (
    <header className="text-white p-6 border-b-[1px] border-gray-400 w-full">
      <h2 className="text-2xl 2xl:text-3xl font-bold text-gray-900">{title}</h2>
      <span className="text-base 2xl:text-lg font-medium text-gray-500">{subtitle}</span>
    </header>
  );
}
