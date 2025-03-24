"use client"

import type React from "react"

import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Sparkles, Trash2, Upload, Pencil } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SketchesPage() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch)
  const sketchesQuery = useQuery(api.sketches.getSketches)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [inputMethod, setInputMethod] = useState<"draw" | "upload">("draw")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ prompt: string }>()

  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const clearUploadedImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = async (formData: { prompt: string }) => {
    try {
      setIsSubmitting(true)
      setErrorMessage("")

      let image: string

      if (inputMethod === "draw") {
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

      await saveSketchMutation({ ...formData, image })
    } catch (error) {
      console.error("Error submitting form:", error)
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
          {/* Left Column - Form */}
          <div className="md:col-span-1 space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium">
                  Describe what you're drawing or uploading
                </Label>
                <Input id="prompt" className="bg-muted border-input" {...register("prompt", { required: true })} />
                {errors.prompt && <span className="text-destructive text-sm">This field is required</span>}
              </div>

              <Tabs
                defaultValue="draw"
                className="w-full"
                onValueChange={(value) => setInputMethod(value as "draw" | "upload")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="draw" className="flex items-center gap-2">
                    <Pencil className="h-4 w-4" />
                    Draw
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="draw" className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Canvas</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => canvasRef.current?.clearCanvas()}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                  <div className="border border-input rounded-lg overflow-hidden bg-muted">
                    <ReactSketchCanvas
                      ref={canvasRef}
                      style={{ width: "100%", height: 300 }}
                      strokeWidth={4}
                      strokeColor="white"
                      backgroundImage="none"
                      exportWithBackgroundImage={false}
                      canvasColor="hsl(var(--muted))"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Image Upload</Label>
                    {uploadedImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearUploadedImage}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {uploadedImage ? (
                    <div className="border border-input rounded-lg overflow-hidden bg-muted h-[300px] flex items-center justify-center">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded image"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className="border border-dashed border-input rounded-lg bg-muted h-[300px] flex flex-col items-center justify-center cursor-pointer hover:bg-muted/70 transition-colors"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Click to upload an image</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG or JPEG</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                {isSubmitting ? "Processing..." : "Generate Image"}
              </Button>
            </form>
          </div>

          {/* Right Column - Recent Sketches */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Sketches</h2>
            </div>

            {sortedSketches.length === 0 ? (
              <div className="text-center py-12 border border-input rounded-lg bg-muted/50">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No sketches yet. Create your first one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sortedSketches.map((sketch) => (
                  <div key={sketch._id} className="border border-input rounded-lg overflow-hidden bg-card p-2">
                    <img
                      src={sketch.result || "/placeholder.svg"}
                      alt="Generated sketch"
                      className="w-full aspect-square object-cover rounded"
                    />
                    <p className="text-sm text-muted-foreground mt-2 truncate">{sketch.prompt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

