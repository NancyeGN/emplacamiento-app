import { mutation } from "./_generated/server";

export const insertarActivos = mutation(async ({ db }) => {
  const activosEjemplo = Array.from({ length: 50 }, (_, i) => ({
    nombre: `Activo ${i + 1}`,
    monto: Math.floor(Math.random() * 100000) + 10000, // Entre 10,000 y 110,000
    tasaInteres: 5 + Math.random() * 10, // Entre 5% y 15%
    plazoMeses: 24, // Siempre 24 meses
  }));

  for (const activo of activosEjemplo) {
    await db.insert("activos", activo);
  }
});
