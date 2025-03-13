import { query } from "./_generated/server";

export const getAllActivos = query(async ({ db }) => {
  return await db.query("activos").collect();
});
