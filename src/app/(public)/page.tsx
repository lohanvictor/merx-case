export default function Home() {
  return (
    <div className="container">
      <div className="p-4 flex flex-col">
        <h1 className="text-4xl font-bold">Case Merx Tech</h1>
        <p>
          Este projeto é a implementação de um case para um processo seletivo
          para Desenvolvedor Front-End JR na Merx Tech.
        </p>

        <p>
          O principal objetivo é desenvolver um dashboard web que replique o
          layout do print anexado, exibindo preços de commodities agrícolas
          (como milho, trigo e soja) integrados a API da{" "}
          <a
            href="https://commodities-api.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            CommoditiesAPI
          </a>
          .
        </p>
        <p>O desafio avalia sua capacidade de:</p>
        <ul className="list-disc pl-5">
          <li>Consumir APIs</li>
          <li>Criar interfaces responsivas</li>
          <li>Gerenciar dados</li>
          <li>Escrever código de qualidade</li>
          <li>Responsividade mobile</li>
          <li>Funcionalidade de login (opcional)</li>
        </ul>

        <p>
          O repositório para o projeto pode ser encontrado no seguinte{" "}
          <a
            href="https://github.com/lohanvictor/merx-case"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            link
          </a>
          .
        </p>
      </div>
    </div>
  );
}
