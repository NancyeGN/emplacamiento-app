import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getAmortizacion = query(async ({ db }, { activoId }: { activoId: Id<"activos"> }) => {
  
  const amortizaciones = await db.query("amortizaciones").withIndex("byActivoId", q => q.eq("activoId", activoId)).collect();
  return amortizaciones;
});
