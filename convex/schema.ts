import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),
  users: defineTable({
    email: v.string(),
    clerkId: v.string(),
  }).index("by_email", ["email"])
});