/* eslint-disable */
/**
 * Generated API stub for build compatibility.
 * Run `npx convex dev` with a real deployment to generate proper types.
 */
import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

// Stub: will be replaced by real codegen
import type * as bakeries from "../bakeries.js";
import type * as products from "../products.js";
import type * as wasteEntries from "../wasteEntries.js";
import type * as analytics from "../analytics.js";

declare const fullApi: ApiFromModules<{
  bakeries: typeof bakeries;
  products: typeof products;
  wasteEntries: typeof wasteEntries;
  analytics: typeof analytics;
}>;

export declare const api: FilterApi<typeof fullApi, FunctionReference<any, "public">>;
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, "internal">>;
