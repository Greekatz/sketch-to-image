
import { internalAction ,internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { ConvexError, v } from "convex/values";
import Replicate from "replicate";

export const saveSketch = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image }) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError("User not authenticated.");
    }
    const sketchId = await ctx.db.insert("sketches", {
      tokenIdentifier: userId,
      prompt,
    });

    await ctx.scheduler.runAfter(0, internal.sketches.generate, {
      sketchId,
      prompt,
      image,
    });

    return sketchId;
  },
});

export const getSketch = query({
  args: { sketchId: v.id("sketches") },
  handler: async (ctx, { sketchId }) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    // Fetch sketch by ID
    const sketch = await ctx.db.get(sketchId);

    // Ensure the sketch belongs to the authenticated user
    if (!sketch || sketch.tokenIdentifier !== userId) {
      throw new Error("Unauthorized access to sketch.");
    }

    return sketch;
  },
});

export const deleteSketch = mutation({
  args: { id: v.id("sketches") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
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
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("User not authenticated.");
    }

    return await ctx.db
      .query("sketches")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});


export const generate = internalAction({
  args: { sketchId: v.id("sketches"), prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image, sketchId }) => {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("Missing REPLICATE_API_TOKEN. Set it in your environment variables.");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
      console.log("Sending request to Replicate API...");

      // 🛠 Call Replicate API to start generation
      const prediction = await replicate.predictions.create({
        version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input: {
          image,
          scale: 7,
          prompt,
          image_resolution: "512",
          n_prompt: "lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry, deformed, realistic, photorealistic"
        },
      });

      console.log("Prediction Created:", prediction);

      // Poll for the result until it's ready
      let status = prediction.status;
      let outputUrls = null;

      while (status !== "succeeded" && status !== "failed") {
        console.log(`⏳ Waiting for Replicate result... (Current status: ${status})`);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const updatedPrediction = await fetch(prediction.urls.get, {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        status = updatedPrediction.status;

        if (status === "succeeded") {
          outputUrls = updatedPrediction.output;
        }
      }

      if (!outputUrls || !Array.isArray(outputUrls) || outputUrls.length === 0) {
        throw new Error(" No valid output URLs found in Replicate response.");
      }

      const imageUrl = outputUrls[1]; //  Extract the first valid URL
      console.log("Final Generated Image URL:", imageUrl);

      //  Save the final image URL to Convex
      await ctx.runMutation(internal.sketches.updateSketchResult, {
        sketchId,
        result: imageUrl,
      });

      console.log("Successfully updated sketch:", sketchId);
    } catch (error: any) {
      console.error("Replicate API Error:", error);

      // Log Replicate's full error response if available
      if (error.response) {
        console.error("Replicate Response:", JSON.stringify(error.response.data, null, 2));
      }

      throw new Error(`Failed to process image: ${error.message}`);
    }
  },
});
