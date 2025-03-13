/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as activos from "../activos.js";
import type * as Amortizaciones from "../Amortizaciones.js";
import type * as functions from "../functions.js";
import type * as generarAmortizacion from "../generarAmortizacion.js";
import type * as insertActivos from "../insertActivos.js";
import type * as registerUser from "../registerUser.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  activos: typeof activos;
  Amortizaciones: typeof Amortizaciones;
  functions: typeof functions;
  generarAmortizacion: typeof generarAmortizacion;
  insertActivos: typeof insertActivos;
  registerUser: typeof registerUser;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
