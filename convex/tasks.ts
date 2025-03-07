import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addTask = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      text: args.text,
      completed: false,
    });
  },
});

export const getTasks = query({
  handler: async (ctx) => {
    return ctx.db.query("tasks").collect();
  },
});