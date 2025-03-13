import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
      const users = await ctx.db.query("users").collect();
      return users;
  },
});


export const storeUser = mutation({
  args: {
    email: v.string(),
    clerkId: v.string(),
    // otros campos
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      clerkId: args.clerkId,
      // otros campos
    });
  },
});