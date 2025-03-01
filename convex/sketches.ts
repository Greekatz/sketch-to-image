
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
      throw new Error("Missing REPLICATE_API_TOKEN. Set it in your environment variables.");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
      console.log("🟢 Sending request to Replicate API...");

      // 🛠 Call Replicate API to start generation
      const prediction = await replicate.predictions.create({
        version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input: {
          image,
          scale: 7,
          prompt,
          image_resolution: "512",
          n_prompt: "cute"
        },
      });

      console.log("✅ Prediction Created:", prediction);

      // 🔄 Poll for the result until it's ready
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
        throw new Error("❌ No valid output URLs found in Replicate response.");
      }

      const imageUrl = outputUrls[1]; // ✅ Extract the first valid URL
      console.log("✅ Final Generated Image URL:", imageUrl);

      // ✅ Save the final image URL to Convex
      await ctx.runMutation(internal.sketches.updateSketchResult, {
        sketchId,
        result: imageUrl,
      });

      console.log("✅ Successfully updated sketch:", sketchId);
    } catch (error: any) {
      console.error("❌ Replicate API Error:", error);

      // Log Replicate's full error response if available
      if (error.response) {
        console.error("❌ Replicate Response:", JSON.stringify(error.response.data, null, 2));
      }

      throw new Error(`Failed to process image: ${error.message}`);
    }
  },
});
