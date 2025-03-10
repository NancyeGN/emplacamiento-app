import { mutation } from "./_generated/server";
import { v } from "convex/values";

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