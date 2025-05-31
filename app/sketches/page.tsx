"use client"

import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas"
import { Sparkles, Trash2, Upload, Pencil } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Imported components and hooks
import { useImageUpload } from "@/hooks/useImageUpload"
import { ImageUploadSection } from "@/components/sections/image-upload-section"
import { SketchGallery } from "@/components/ui/sketch-gallery"

// Constants
const INPUT_METHODS = {
  DRAW: "draw",
  UPLOAD: "upload"
} as const

// Types
type InputMethod = typeof INPUT_METHODS[keyof typeof INPUT_METHODS]
type SketchFormData = { prompt: string }

export default function SketchesPage() {
  // Convex 
  const saveSketchMutation = useMutation(api.sketches.saveSketch)
  const sketchesQuery = useQuery(api.sketches.getSketches)

  // State Management
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputMethod, setInputMethod] = useState<InputMethod>(INPUT_METHODS.DRAW)

  // Image Upload Hook
  const {
    uploadedImage,
    fileInputRef,
    handleFileChange,
    triggerFileInput,
    clearUploadedImage
  } = useImageUpload()

  // Refs
  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  // Form Handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SketchFormData>()

  // Sorting sketches by creation time
  const sortedSketches = (sketchesQuery ?? [])
  .sort((a, b) => b._creationTime - a._creationTime)
  .map(sketch => ({
    ...sketch,
    _id: sketch._id.toString(), // Convert Convex Id to string
  }));

  // Form Submission Handler
  const onSubmit = async (formData: SketchFormData) => {
    try {
      setIsSubmitting(true)
      setErrorMessage("")

      let image: string

      if (inputMethod === INPUT_METHODS.DRAW) {
        if (!canvasRef.current) {
          throw new Error("Canvas reference is missing.")
        }

        const canvasImage = await canvasRef.current.exportImage("jpeg")
        if (!canvasImage) {
          throw new Error("Failed to export canvas image.")
        }
        image = canvasImage
      } else {
        if (!uploadedImage) {
          throw new Error("No image uploaded.")
        }
        image = uploadedImage
      }

      // Save the sketch
      await saveSketchMutation({ 
        ...formData, 
        image 
      })

      // Reset form and state
      reset()
      clearUploadedImage()
      canvasRef.current?.clearCanvas()
    } catch (error) {
      console.error("Sketch submission error:", error)
      setErrorMessage("Failed to save the sketch. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sketch Creation Form */}
          <div className="md:col-span-1 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt">
                  Describe your sketch
                </Label>
                <Input 
                  id="prompt"
                  placeholder="What would you like to draw?"
                  className="bg-muted border-input" 
                  {...register("prompt", { 
                    required: "Description is required",
                    minLength: {
                      value: 3,
                      message: "Description must be at least 3 characters"
                    }
                  })} 
                />
                {errors.prompt && (
                  <p className="text-destructive text-sm">
                    {errors.prompt.message}
                  </p>
                )}
              </div>

              {/* Input Method Tabs */}
              <Tabs
                value={inputMethod}
                onValueChange={(value) => setInputMethod(value as InputMethod)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value={INPUT_METHODS.DRAW}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Draw
                  </TabsTrigger>
                  <TabsTrigger value={INPUT_METHODS.UPLOAD}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                {/* Drawing Canvas */}
                <TabsContent value={INPUT_METHODS.DRAW} className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <Label>Canvas</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => canvasRef.current?.clearCanvas()}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <ReactSketchCanvas
                      ref={canvasRef}
                      strokeWidth={4}
                      strokeColor="white"
                      canvasColor="hsl(var(--muted))"
                      style={{ width: '100%', height: '300px' }}
                    />
                  </div>
                </TabsContent>

                {/* Image Upload */}
                <TabsContent value={INPUT_METHODS.UPLOAD} className="space-y-2 mt-4">
                  <ImageUploadSection
                    uploadedImage={uploadedImage}
                    triggerFileInput={triggerFileInput}
                    clearUploadedImage={clearUploadedImage}
                    fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
                    handleFileChange={handleFileChange}
                  />
                </TabsContent>
              </Tabs>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-destructive text-sm">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isSubmitting ? "Processing..." : "Generate Sketch"}
              </Button>
            </form>
          </div>

          {/* Recent Sketches Display */}
          <div className="md:col-span-2">
            <SketchGallery sketches={sortedSketches} />
          </div>
        </div>
      </main>
    </div>
  )
}