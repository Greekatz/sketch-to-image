"use client";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef } from "react";

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(async (formData) => {
          try {
            if(!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            await saveSketchMutation({ ...formData, image });
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        })}
      >
        {/* Input field for text prompt */}
        <input
          className="text-black border p-2 rounded"
          {...register("prompt", { required: true })}
          placeholder="Enter prompt..."
        />
        {errors.prompt && <span className="text-red-500">This field is required</span>}

        {/* Sketch Canvas */}
        <ReactSketchCanvas
          ref={canvasRef}
          style={{ width: 256, height: 256, border: "1px solid #ccc", borderRadius: "8px" }}
          strokeWidth={4}
          strokeColor="black"
        />

        {/* Submit Button is now BELOW the Canvas */}
        <input
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
          value="Submit"
        />
      </form>
    </main>
  );
}
