import { FormEvent, useMemo, useState } from "react";
import { inscritos as initialAthletes, Athlete } from "../data/inscritos";

export default function Home() {
  const [athleteList, setAthleteList] = useState<Athlete[]>(initialAthletes);

  const [localidade, setRegion] = useState("");
  const [faixa, setBelt] = useState("");
  const [modalidade, setModality] = useState("");
  const [maxWeight, setMaxWeight] = useState("");

const filteredInscritos = useMemo(() => {
  return athleteList.filter((inscritos) => {
    const matchesRegion = localidade ? inscritos.localidade === localidade : true;
    const matchesBelt = faixa ? inscritos.faixa === faixa : true;

    const matchesModality = modalidade
      ? inscritos.modalidade === modalidade || inscritos.modalidade === "Ambos"
      : true;

    const matchesWeight = maxWeight
      ? inscritos.weight <= Number(maxWeight)
      : true;

    return matchesRegion && matchesBelt && matchesModality && matchesWeight;
  });
}, [athleteList, localidade, faixa, maxWeight]);