import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  bakeries: defineTable({
    name: v.string(),
    ownerId: v.string(),
    plan: v.string(), // "trial" | "starter" | "pro" | "expired"
    stripeCustomerId: v.optional(v.string()),
    trialEndsAt: v.number(), // timestamp
  }).index("by_owner", ["ownerId"]),

  products: defineTable({
    bakeryId: v.id("bakeries"),
    name: v.string(),
    unit: v.string(), // "kg" | "units" | "loaves" | "dozen"
    costPerUnit: v.number(),
    category: v.string(), // "bread" | "pastry" | "cake" | "ingredient" | "other"
  }).index("by_bakery", ["bakeryId"]),

  wasteEntries: defineTable({
    bakeryId: v.id("bakeries"),
    productId: v.id("products"),
    quantity: v.number(),
    reason: v.string(), // "overproduction" | "spoilage" | "damage" | "returned" | "expired"
    loggedBy: v.string(),
    loggedAt: v.number(), // timestamp
    dollarValue: v.number(),
  })
    .index("by_bakery", ["bakeryId"])
    .index("by_bakery_date", ["bakeryId", "loggedAt"]),
});

export default schema;
