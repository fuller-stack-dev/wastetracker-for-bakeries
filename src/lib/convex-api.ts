/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Convex API stubs for type-safe usage in the app.
 * When connected to a real Convex deployment, these are populated by codegen.
 * In demo/build mode, useQuery with "skip" returns undefined, which is handled
 * by demo fallbacks in each page.
 */

// Typed API namespace — matches Convex codegen structure
export const api = {
  bakeries: {
    getBakery: "bakeries:getBakery" as any,
    createBakery: "bakeries:createBakery" as any,
    updatePlan: "bakeries:updatePlan" as any,
  },
  products: {
    listProducts: "products:listProducts" as any,
    createProduct: "products:createProduct" as any,
    updateProduct: "products:updateProduct" as any,
    deleteProduct: "products:deleteProduct" as any,
  },
  wasteEntries: {
    logWaste: "wasteEntries:logWaste" as any,
    getWasteToday: "wasteEntries:getWasteToday" as any,
    getWasteLast7Days: "wasteEntries:getWasteLast7Days" as any,
  },
  analytics: {
    getDailyTotals: "analytics:getDailyTotals" as any,
    getByReason: "analytics:getByReason" as any,
  },
} as const;

// Id type for Convex document references
export type Id<T extends string> = string & { __tableName: T };
