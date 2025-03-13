"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import ActivosTable from "../components/ActivosTable";
import AmortizacionTable from "../components/AmortizacionTable";


export default function Home() {
  const activos = useQuery(api.activos.getAllActivos);
  const [activoSeleccionado, setActivoSeleccionado] = useState<Id<"activos"> | null>(null);
  return (
    <div>
      <h1>Activos Financieros</h1>
      <ActivosTable onSelect={setActivoSeleccionado} />
      {activoSeleccionado && (
        <div>
          <h2>Tabla de Amortización</h2>
          <AmortizacionTable activoId={activoSeleccionado} />
        </div>
      )}
    </div>
  );
}
