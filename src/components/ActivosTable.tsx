"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueFormatterParams, ClientSideRowModelModule } from 'ag-grid-community';
import { Id } from "../../convex/_generated/dataModel";

type Activo = {
  _id: Id<"activos">;
  _creationTime: number;
  nombre: string;
  monto: number;
  tasaInteres: number;
  plazoMeses: number;
};

export default function ActivosTable({ onSelect }: { onSelect: (id: Id<"activos">) => void }) {
  const activos = useQuery(api.activos.getAllActivos);
  const updatePlazo = useMutation(api.activos.updatePlazo);

  if (!activos) return <p>Cargando activos...</p>;

  const handlePlazoChange = (activoId: Id<"activos">, nuevoPlazo: number) => {
    updatePlazo({ activoId, nuevoPlazo });
  };

  const columnDefs: ColDef<Activo>[] = [
    { headerName: "Nombre", field: "nombre", sortable: true, filter: true },
    { headerName: "Monto", field: "monto", valueFormatter: (p: ValueFormatterParams<Activo>) => `$${p.value.toFixed(2)}`, sortable: true },
    { headerName: "Tasa de Interés", field: "tasaInteres", valueFormatter: (p: ValueFormatterParams<Activo>) => `${p.value.toFixed(2)}%`, sortable: true },
    { headerName: "Plazo (meses)", field: "plazoMeses", editable: true, onCellValueChanged: ({ data, newValue }) => handlePlazoChange(data._id, Number(newValue)), },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={activos}
        columnDefs={columnDefs}
        rowSelection="single"
        theme="legacy"
        modules={[ClientSideRowModelModule]}
        onRowClicked={row => row.data && onSelect(row.data._id)}
      />
    </div>
  );
}
