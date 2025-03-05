import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sketches: defineTable({
    tokenIdentifier: v.string(),
    prompt: v.string(),
    result: v.optional(v.string()),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
});