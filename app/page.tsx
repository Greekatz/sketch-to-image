"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ prompt: string }>();

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  const onSubmit = async (formData: { prompt: string }) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (!canvasRef.current) {
        throw new Error("Canvas reference is missing.");
      }

      const image = await canvasRef.current.exportImage("jpeg");

      if (!image) {
        throw new Error("Failed to export image.");
      }

      await saveSketchMutation({ ...formData, image });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to save the sketch. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <div className="container mx-auto flex gap-4">
        <form
          className="flex flex-col gap-2 w-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label htmlFor="prompt">Prompt</Label>
          <Input id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span className="text-red-500">This field is required</span>}

          <Label className="mt-4">Canvas (Draw something below)</Label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: 256, height: 256, border: "1px solid #ccc", borderRadius: "8px" }}
            strokeWidth={4}
            strokeColor="black"
          />

          {/* Error Message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button
            type="button"
            variant={"ghost"}
            onClick={() => {
              canvasRef.current?.clearCanvas();
            }}
          >
            Clear
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>

        <section>
          <h2>Recent Sketches</h2>
          <div className="grid grid-cols-4 gap-4">
            {sortedSketches.map((sketch) => (
              <img key={sketch._id} width="256" height="256" src={sketch.result} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
