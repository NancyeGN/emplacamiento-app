"use client";

import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import ActivosTable from "../components/ActivosTable";
import AmortizacionTable from "../components/AmortizacionTable";


export default function Home() {

  const [activoSeleccionado, setActivoSeleccionado] = useState<Id<"activos"> | null>(null);
  return (
    <div>
      <div className="w-220">
      <h1>Activos Financieros</h1>
      <ActivosTable onSelect={setActivoSeleccionado} />
      </div>
      {activoSeleccionado && (
        <div>
          <h2>Tabla de Amortización</h2>
          <AmortizacionTable key={activoSeleccionado} activoId={activoSeleccionado} />
        </div>
      )}
    </div>
  );
}
