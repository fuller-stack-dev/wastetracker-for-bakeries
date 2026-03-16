import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createProduct = mutation({
  args: {
    bakeryId: v.id("bakeries"),
    name: v.string(),
    unit: v.string(),
    costPerUnit: v.number(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    unit: v.optional(v.string()),
    costPerUnit: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { productId, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(productId, filtered);
  },
});

export const deleteProduct = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.productId);
  },
});

export const listProducts = query({
  args: { bakeryId: v.id("bakeries") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_bakery", (q) => q.eq("bakeryId", args.bakeryId))
      .collect();
  },
});
