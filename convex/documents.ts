import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// this is the post api for create the document
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // first get the logged in user
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

// this is the get api for get the document
// here we add the pagination also provide by the convex
export const get = query({
  args: {paginationOpts: paginationOptsValidator},
  handler: async (ctx , args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});
