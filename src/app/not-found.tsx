import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="w-full p-4">
      <div className="flex flex-col border rounded-lg p-4 bg-gray-100">
        <h2 className="text-7xl font-extralight">
          A página acessada <br />{" "}
          <span className="text-5xl font-semibold">
            não está disponível no momento.
          </span>
        </h2>
      </div>

      <Link href="/">Voltar para a página inicial</Link>
    </section>
  );
}
