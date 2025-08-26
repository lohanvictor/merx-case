"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function DashboardError(props: Props) {
  return (
    <section className="w-full p-4 flex flex-col gap-2">
      <div className="flex flex-col border rounded-lg p-4 bg-gray-100">
        <h2 className="text-4xl font-extralight">
          Algo inesperado ocorreu neste módulo. <br />{" "}
          <span className="text-3xl font-semibold">
            Tente novamente mais tarde.
          </span>
        </h2>
      </div>

      <button
        onClick={props.reset}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:cursor-pointer"
      >
        Tentar Novamente
      </button>
    </section>
  );
}
