import { mutation, query } from "./_generated/server";

export const generarAmortizacion = mutation(async ({ db }) => {
  const activos = await db.query("activos").collect();

  for (const activo of activos) {
    const { _id, monto, tasaInteres, plazoMeses } = activo;

    let saldo = monto;
    const tasaMensual = tasaInteres / 100 / 12;
    const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));

    for (let mes = 1; mes <= plazoMeses; mes++) {
      const interes = saldo * tasaMensual;
      const abonoCapital = cuota - interes;
      const saldoFinal = saldo - abonoCapital;

      await db.insert("amortizaciones", {
        activoId: _id,
        mes,
        saldoInicial: saldo,
        cuota,
        interes,
        abonoCapital,
        saldoFinal,
      });

      saldo = saldoFinal;
    }
  }
});
