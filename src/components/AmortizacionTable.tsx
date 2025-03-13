"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Id } from "../../convex/_generated/dataModel";
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Amortizacion = {
  _id: Id<"amortizaciones">;
  _creationTime: number;
  activoId: Id<"activos">;
  mes: number;
  saldoInicial: number;
  cuota: number;
  interes: number;
  abonoCapital: number;
  saldoFinal: number;
};

export default function AmortizacionTable({ activoId }: { activoId: Id<"activos"> }) {
  const amortizaciones = useQuery(api.Amortizaciones.getAmortizacion, { activoId });

  if (!amortizaciones) return <p>Cargando tabla de amortización...</p>;

  const columnDefs: ColDef<Amortizacion>[] = [
    { headerName: "Mes", field: "mes", width: 90 },
    { headerName: "Saldo Inicial", field: "saldoInicial", valueFormatter: (p: ValueFormatterParams) => p.value.toFixed(2) },
    { headerName: "Cuota", field: "cuota", valueFormatter: (p: ValueFormatterParams) => p.value.toFixed(2) },
    { headerName: "Interés", field: "interes", valueFormatter: (p: ValueFormatterParams) => p.value.toFixed(2) },
    { headerName: "Abono a Capital", field: "abonoCapital", valueFormatter: (p: ValueFormatterParams) => p.value.toFixed(2) },
    { headerName: "Saldo Final", field: "saldoFinal", valueFormatter: (p: ValueFormatterParams) => p.value.toFixed(2) },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={amortizaciones} columnDefs={columnDefs} theme="legacy" />
    </div>
  );
}
