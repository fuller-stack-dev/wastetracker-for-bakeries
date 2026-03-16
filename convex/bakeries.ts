import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBakery = mutation({
  args: {
    name: v.string(),
    ownerId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bakeries")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .first();
    if (existing) return existing._id;

    const trialEndsAt = Date.now() + 14 * 24 * 60 * 60 * 1000; // 14 days
    return await ctx.db.insert("bakeries", {
      name: args.name,
      ownerId: args.ownerId,
      plan: "trial",
      trialEndsAt,
    });
  },
});

export const getBakery = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bakeries")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.userId))
      .first();
  },
});

export const updatePlan = mutation({
  args: {
    bakeryId: v.id("bakeries"),
    plan: v.string(),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bakeryId, {
      plan: args.plan,
      ...(args.stripeCustomerId && { stripeCustomerId: args.stripeCustomerId }),
    });
  },
});
