export type Atleta = {
  id: number;
  nome: string;
  faixa: "Branca" | "Azul" | "Roxa" | "Marrom" | "Preta";
  peso: number;
  regiao: string;
  modalidade: "Gi" | "No-Gi" | "Ambos";
  objetivo: string;
  disponibilidade: string;
  contato: string;
};

export const atletas: Atleta[] = [
  {
    id: 1,
    nome: "Lucas Andrade",
    faixa: "Azul",
    peso: 78,
    regiao: "Brooklin",
    modalidade: "No-Gi",
    objetivo: "Drills de passagem e rolas leves",
    disponibilidade: "Terça e quinta às 20h",
    contato: "@lucasbjj",
  },
  {
    id: 2,
    nome: "Marina Costa",
    faixa: "Roxa",
    peso: 64,
    regiao: "Moema",
    modalidade: "Gi",
    objetivo: "Treino técnico de guarda e raspagens",
    disponibilidade: "Segunda e quarta às 19h",
    contato: "@marinacosta",
  },
  {
    id: 3,
    nome: "Rafael Nunes",
    faixa: "Branca",
    peso: 85,
    regiao: "Vila Olímpia",
    modalidade: "Ambos",
    objetivo: "Rolas leves e evolução técnica",
    disponibilidade: "Sábado de manhã",
    contato: "@rafanunes",
  },
  {
    id: 4,
    nome: "Bruno Martins",
    faixa: "Roxa",
    peso: 92,
    regiao: "Brooklin",
    modalidade: "No-Gi",
    objetivo: "Treino competitivo",
    disponibilidade: "Sexta às 18h",
    contato: "@brunomartins",
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    faixa: "Azul",
    peso: 58,
    regiao: "Pinheiros",
    modalidade: "Gi",
    objetivo: "Treino técnico de guarda fechada",
    disponibilidade: "Quarta às 20h",
    contato: "@fernandabjj",
  },
  {
    id: 6,
    nome: "Caio Ribeiro",
    faixa: "Marrom",
    peso: 88,
    regiao: "Moema",
    modalidade: "Ambos",
    objetivo: "Rolas competitivos e preparação para campeonato",
    disponibilidade: "Sábado à tarde",
    contato: "@caioribeiro",
  },
];