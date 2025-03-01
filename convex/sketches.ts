
import { internalAction ,internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import Replicate from "replicate";

export const saveSketch = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image }) => {
    const sketch = await ctx.db.insert("sketches", {
      prompt,
    });

    await ctx.scheduler.runAfter(0, internal.sketches.generate, {
      sketchId: sketch,
      prompt,
      image,
    });

    return sketch;
  },
});

export const getSketch = query({
  args: { sketchId: v.id("sketches") },
  handler: (ctx, { sketchId }) => {
    if (!sketchId) return null;
    return ctx.db.get(sketchId);
  },
});

export const updateSketchResult = internalMutation({
  args: { sketchId: v.id("sketches"), result: v.string() },
  handler: async (ctx, { sketchId, result }) => {
    await ctx.db.patch(sketchId, {
      result,
    });
  },
});

export const getSketches = query({
  handler: async (ctx) => {
    const sketches = await ctx.db.query("sketches").collect();
    return sketches;
  },
});


export const generate = internalAction({
  args: { sketchId: v.id("sketches"), prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image, sketchId }) => {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        "Add REPLICATE_API_TOKEN to your environment variables: " +
          "https://docs.convex.dev/production/environment-variables"
      );
    }
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = (await replicate.run(
      "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      {
        input: {
          image,
          scale: 7,
          prompt,
          image_resolution: "512",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        },
      }
    )) as [string, string];

    await ctx.runMutation(internal.sketches.updateSketchResult, {
      sketchId,
      result: output[1],
    });
  },
});