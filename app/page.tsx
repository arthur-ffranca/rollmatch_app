"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Atleta } from "../data/atletas";
import { atletas } from "../data/atletas";

export default function Home() {
  const [listaAtletas, setListaAtletas] = useState<Atleta[]>(atletas);

  const [modalAberto, setModalAberto] = useState(false);

  const [regiao, setRegiao] = useState("");
  const [faixa, setFaixa] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [pesoMaximo, setPesoMaximo] = useState("");

  const regioes = useMemo(() => {
    return Array.from(new Set(listaAtletas.map((atleta) => atleta.regiao))).sort();
  }, [listaAtletas]);

  const atletasFiltrados = useMemo(() => {
    return listaAtletas.filter((atleta) => {
      const combinaRegiao = regiao ? atleta.regiao === regiao : true;
      const combinaFaixa = faixa ? atleta.faixa === faixa : true;

      const combinaModalidade = modalidade
        ? atleta.modalidade === modalidade || atleta.modalidade === "Ambos"
        : true;

      const combinaPeso = pesoMaximo
        ? atleta.peso <= Number(pesoMaximo)
        : true;

      return combinaRegiao && combinaFaixa && combinaModalidade && combinaPeso;
    });
  }, [listaAtletas, regiao, faixa, modalidade, pesoMaximo]);

  function cadastrarAtleta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const novoAtleta: Atleta = {
      id: Date.now(),
      nome: String(formData.get("nome")),
      faixa: String(formData.get("faixa")) as Atleta["faixa"],
      peso: Number(formData.get("peso")),
      regiao: String(formData.get("regiao")),
      modalidade: String(formData.get("modalidade")) as Atleta["modalidade"],
      objetivo: String(formData.get("objetivo")),
      disponibilidade: String(formData.get("disponibilidade")),
      contato: String(formData.get("contato")),
    };

    setListaAtletas((atletasAtuais) => [novoAtleta, ...atletasAtuais]);

    event.currentTarget.reset();
    setModalAberto(false);
  }

  function gerarConvite(
    nome: string,
    modalidade: string,
    regiaoSelecionada: string,
    objetivo: string
  ) {
    return `Fala, ${nome}! Vi que você está disponível para treinar ${modalidade} na região do ${regiaoSelecionada}. Bora marcar um treino? Curti a ideia de fazer ${objetivo.toLowerCase()}.`;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
              RollMatch
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Encontre parceiros de treino de Jiu-Jitsu perto de você.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Filtre por região, faixa, peso e modalidade para encontrar pessoas
              compatíveis para drills, rolas leves, open mat ou treino competitivo.
            </p>
          </div>

          <button
            onClick={() => setModalAberto(true)}
            className="w-full rounded-xl bg-white px-5 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200 md:w-auto"
          >
            Cadastrar atleta
          </button>
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-4">
          <select
            className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
            value={regiao}
            onChange={(event) => setRegiao(event.target.value)}
          >
            <option value="">Todas as regiões</option>

            {regioes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
            value={faixa}
            onChange={(event) => setFaixa(event.target.value)}
          >
            <option value="">Todas as faixas</option>
            <option value="Branca">Branca</option>
            <option value="Azul">Azul</option>
            <option value="Roxa">Roxa</option>
            <option value="Marrom">Marrom</option>
            <option value="Preta">Preta</option>
          </select>

          <select
            className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
            value={modalidade}
            onChange={(event) => setModalidade(event.target.value)}
          >
            <option value="">Todas as modalidades</option>
            <option value="Gi">Gi</option>
            <option value="No-Gi">No-Gi</option>
            <option value="Ambos">Ambos</option>
          </select>

          <input
            className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
            type="number"
            placeholder="Peso máximo"
            value={pesoMaximo}
            onChange={(event) => setPesoMaximo(event.target.value)}
          />
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-zinc-400">
          <p>{atletasFiltrados.length} parceiro(s) encontrado(s)</p>

          <button
            className="rounded-xl border border-zinc-800 px-4 py-2 transition hover:bg-zinc-900"
            onClick={() => {
              setRegiao("");
              setFaixa("");
              setModalidade("");
              setPesoMaximo("");
            }}
          >
            Limpar filtros
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {atletasFiltrados.map((atleta) => {
            const convite = gerarConvite(
              atleta.nome,
              atleta.modalidade,
              atleta.regiao,
              atleta.objetivo
            );

            return (
              <article
                key={atleta.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{atleta.nome}</h2>

                    <p className="mt-1 text-sm text-zinc-400">
                      {atleta.faixa} • {atleta.peso}kg • {atleta.regiao}
                    </p>
                  </div>

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                    {atleta.modalidade}
                  </span>
                </div>

                <div className="space-y-2 text-sm leading-6 text-zinc-300">
                  <p>
                    <strong className="text-white">Objetivo:</strong>{" "}
                    {atleta.objetivo}
                  </p>

                  <p>
                    <strong className="text-white">Disponibilidade:</strong>{" "}
                    {atleta.disponibilidade}
                  </p>

                  <p>
                    <strong className="text-white">Contato:</strong>{" "}
                    {atleta.contato}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-zinc-800 p-4 text-sm leading-6 text-zinc-300">
                  {convite}
                </div>

                <button
                  className="mt-4 w-full rounded-xl bg-white px-4 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200"
                  onClick={() => navigator.clipboard.writeText(convite)}
                >
                  Copiar convite
                </button>
              </article>
            );
          })}
        </div>

        {atletasFiltrados.length === 0 && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            Nenhum parceiro encontrado com esses filtros.
          </div>
        )}
      </section>

      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Cadastrar atleta</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Preencha os dados para adicionar um novo parceiro de treino ao RollMatch.
                </p>
              </div>

              <button
                onClick={() => setModalAberto(false)}
                className="rounded-xl border border-zinc-800 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={cadastrarAtleta}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="nome"
                  required
                  placeholder="Nome"
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
                />

                <select
                  name="faixa"
                  required
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
                >
                  <option value="">Faixa</option>
                  <option value="Branca">Branca</option>
                  <option value="Azul">Azul</option>
                  <option value="Roxa">Roxa</option>
                  <option value="Marrom">Marrom</option>
                  <option value="Preta">Preta</option>
                </select>

                <input
                  name="peso"
                  required
                  type="number"
                  placeholder="Peso"
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
                />

                <input
                  name="regiao"
                  required
                  placeholder="Região"
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
                />

                <select
                  name="modalidade"
                  required
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
                >
                  <option value="">Modalidade</option>
                  <option value="Gi">Gi</option>
                  <option value="No-Gi">No-Gi</option>
                  <option value="Ambos">Ambos</option>
                </select>

                <input
                  name="disponibilidade"
                  required
                  placeholder="Disponibilidade"
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2"
                />

                <input
                  name="objetivo"
                  required
                  placeholder="Objetivo do treino"
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2 md:col-span-2"
                />

                <input
                  name="contato"
                  required
                  placeholder="Instagram ou WhatsApp"
                  className="rounded-xl bg-zinc-800 p-3 text-sm outline-none ring-zinc-600 transition focus:ring-2 md:col-span-2"
                />
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="rounded-xl border border-zinc-800 px-5 py-3 font-medium text-zinc-300 transition hover:bg-zinc-900"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-white px-5 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200"
                >
                  Salvar cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
