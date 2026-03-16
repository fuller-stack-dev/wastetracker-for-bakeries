import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logWaste = mutation({
  args: {
    bakeryId: v.id("bakeries"),
    productId: v.id("products"),
    quantity: v.number(),
    reason: v.string(),
    loggedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");

    const dollarValue = args.quantity * product.costPerUnit;
    return await ctx.db.insert("wasteEntries", {
      bakeryId: args.bakeryId,
      productId: args.productId,
      quantity: args.quantity,
      reason: args.reason,
      loggedBy: args.loggedBy,
      loggedAt: Date.now(),
      dollarValue,
    });
  },
});

export const getWasteToday = query({
  args: { bakeryId: v.id("bakeries") },
  handler: async (ctx, args) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return await ctx.db
      .query("wasteEntries")
      .withIndex("by_bakery_date", (q) =>
        q.eq("bakeryId", args.bakeryId).gte("loggedAt", startOfDay.getTime())
      )
      .collect();
  },
});

export const getWasteLast7Days = query({
  args: { bakeryId: v.id("bakeries") },
  handler: async (ctx, args) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return await ctx.db
      .query("wasteEntries")
      .withIndex("by_bakery_date", (q) =>
        q.eq("bakeryId", args.bakeryId).gte("loggedAt", sevenDaysAgo)
      )
      .collect();
  },
});
