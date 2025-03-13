import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export const getAllActivos = query(async ({ db }) => {
  return await db.query("activos").collect();
});


export const updatePlazo = mutation(
  async ({ db }, { activoId, nuevoPlazo }: { activoId: Id<"activos">; nuevoPlazo: number }) => {
    // Actualiza el plazo del activo
    await db.patch(activoId, { plazoMeses: nuevoPlazo });

    // Elimina la tabla de amortización anterior
    const amortizaciones = await db.query("amortizaciones").withIndex("byActivoId", q => q.eq("activoId", activoId)).collect();
    
    for (const amortizacion of amortizaciones) {
      await db.delete(amortizacion._id);
    }

    // Recalcular y volver a insertar la tabla de amortización
    const activo = await db.get(activoId);
    if (!activo) {
      
      throw new Error("Activo no encontrado");}

      

    const tasaMensual = activo.tasaInteres / 100 / 12;
    const cuota = (activo.monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -nuevoPlazo));

    let saldoInicial = activo.monto;
    for (let mes = 1; mes <= nuevoPlazo; mes++) {
      const interes = saldoInicial * tasaMensual;
      const abonoCapital = cuota - interes;
      const saldoFinal = saldoInicial - abonoCapital;

      await db.insert("amortizaciones", {
        activoId,
        mes,
        saldoInicial,
        cuota,
        interes,
        abonoCapital,
        saldoFinal,
      });

      saldoInicial = saldoFinal;
    }
  }
);
