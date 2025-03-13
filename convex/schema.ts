import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkId: v.string(),
  }).index("by_email", ["email"]),

  activos: defineTable({
    nombre: v.string(),
    monto: v.number(),
    tasaInteres: v.number(),
    plazoMeses: v.number(),
  }),

  amortizaciones: defineTable({
    activoId: v.id("activos"),
    mes: v.number(),
    saldoInicial: v.number(),
    cuota: v.number(),
    interes: v.number(),
    abonoCapital: v.number(),
    saldoFinal: v.number(),
  }).index("byActivoId", ["activoId"]),
});