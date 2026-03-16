import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDailyTotals = query({
  args: {
    bakeryId: v.id("bakeries"),
    days: v.number(),
  },
  handler: async (ctx, args) => {
    const startTime = Date.now() - args.days * 24 * 60 * 60 * 1000;

    const entries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_bakery_date", (q) =>
        q.eq("bakeryId", args.bakeryId).gte("loggedAt", startTime)
      )
      .collect();

    const dailyMap = new Map<
      string,
      { totalDollarWaste: number; products: Map<string, number>; entryCount: number }
    >();

    for (const entry of entries) {
      const date = new Date(entry.loggedAt).toISOString().split("T")[0];
      const existing = dailyMap.get(date) || {
        totalDollarWaste: 0,
        products: new Map<string, number>(),
        entryCount: 0,
      };
      existing.totalDollarWaste += entry.dollarValue;
      existing.entryCount += 1;
      const productTotal = existing.products.get(entry.productId) || 0;
      existing.products.set(entry.productId, productTotal + entry.dollarValue);
      dailyMap.set(date, existing);
    }

    return Array.from(dailyMap.entries()).map(([date, data]) => {
      let topProduct = "";
      let topAmount = 0;
      for (const [productId, amount] of data.products) {
        if (amount > topAmount) {
          topProduct = productId;
          topAmount = amount;
        }
      }
      return {
        date,
        totalDollarWaste: data.totalDollarWaste,
        topProduct,
        entryCount: data.entryCount,
      };
    });
  },
});

export const getByReason = query({
  args: {
    bakeryId: v.id("bakeries"),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_bakery_date", (q) =>
        q.eq("bakeryId", args.bakeryId).gte("loggedAt", args.startDate)
      )
      .collect();

    const filtered = entries.filter((e) => e.loggedAt <= args.endDate);
    const reasonMap = new Map<string, number>();

    for (const entry of filtered) {
      const current = reasonMap.get(entry.reason) || 0;
      reasonMap.set(entry.reason, current + entry.dollarValue);
    }

    return Array.from(reasonMap.entries()).map(([reason, totalDollarWaste]) => ({
      reason,
      totalDollarWaste,
    }));
  },
});
