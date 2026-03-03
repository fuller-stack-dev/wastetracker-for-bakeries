import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
  }).index("by_email", ["email"]),
});

export default schema;
