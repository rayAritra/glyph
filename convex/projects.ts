import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { verifyAuth } from "./auth";
export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        if (!identity) {
            throw new Error("You are not authnticated");

        }
        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identity?.subject,
            updatedAt: Date.now(),

        });
        return projectId;

    },
});

export const getPartial = query({
    args: {
        limit: v.number(),
        // cursor: v.optional(v.id("projects")),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        if (!identity) {
            return [];
        }
        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
            .take(args.limit);
    },
})

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        if (!identity) {
            return [];
        }
        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
            .collect();
    },
})

export const getById = query({
    args: {
        id: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const projectId = ctx.db.normalizeId("projects", args.id);
        if (!projectId) {
            return null;
        }

        const project = await ctx.db.get(projectId);
        if (!project) {
            return null;
        }

        if (project.ownerId !== identity?.subject) {
            throw new Error("You are not authorized to access this project");
        }
        return project;
    },
});


export const rename = mutation({
    args: {
        id: v.string(),
        name: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const projectId = ctx.db.normalizeId("projects", args.id);
        if (!projectId) {
            throw new Error("Invalid project ID");
        }

        const project = await ctx.db.get(projectId);
        if (!project) {
            throw new Error("Project not found");
        }

        if (project.ownerId !== identity?.subject) {
            throw new Error("You are not authorized to access this project");
        }

        await ctx.db.patch(projectId, {
            name: args.name,
            updatedAt: Date.now(),
        });

        const updated = await ctx.db.get(projectId);
        return updated;
    },
});