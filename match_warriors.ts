"use client";

import { useMemo, useState } from "react";
import { inscritos } from "../data/inscritos"


const filteredInscritos = useMemo(() => {
  return inscritos.filter((inscritos) => {
    const matchesRegion = localidade ? inscritos.localidade === localidade : true;
    const matchesBelt = faixa ? inscritos.faixa === faixa : true;

    const matchesModality = modalidade
      ? inscritos.modalidade === modalidade || inscritos.modalidade === "Ambos"
      : true;

    const matchesWeight = maxweight
      ? inscritos.weight <= Number(maxweight)
      : true;

    return matchesRegion && matchesBelt && matchesModality && matchesWeight;
  });
}, [regiao, faixa, modalidade, maxWeight]);