import {internal} from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveSketch = mutation(
  async ({ db }, { prompt }: { prompt: string }) => {
    await db.insert("sketches", {
      prompt,
  });

  return {
    message: "Sketch saved successfully",
  };
}
);

export const getSketches = query(async({db}) => {
  const sketches = await db.query("sketches").collect();
  return sketches;
});

export const updateSketchResult = internalMutation({
  args: { sketchId: v.id("sketches"), result: v.string() },
  handler: async (ctx, { sketchId, result }) => {
    await ctx.db.patch(sketchId, {
      result,
    });
  },
});
