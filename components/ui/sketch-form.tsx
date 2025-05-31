"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sparkles, Trash2, Upload, Pencil } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useImageUpload } from "@/hooks/useImageUpload"

type FormValues = {
  prompt: string
}

export function SketchForm() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputMethod, setInputMethod] = useState<"draw" | "upload">("draw")
  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  const {
    uploadedImage,
    fileInputRef,
    handleFileChange,
    triggerFileInput,
    clearUploadedImage,
  } = useImageUpload()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (formData: FormValues) => {
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

      reset()
      canvasRef.current?.clearCanvas()
      clearUploadedImage()

      // Removed toast on success
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Failed to save the sketch. Please try again.")

      // Removed toast on error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
          <DrawingCanvas canvasRef={canvasRef} />
        </TabsContent>

        <TabsContent value="upload" className="space-y-2 mt-4">
          <UploadPanel
            uploadedImage={uploadedImage}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            triggerFileInput={triggerFileInput}
            clearUploadedImage={clearUploadedImage}
          />
        </TabsContent>
      </Tabs>

      {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        <Sparkles className="h-4 w-4 mr-2" />
        {isSubmitting ? "Processing..." : "Generate Image"}
      </Button>
    </form>
  )
}

type DrawingCanvasProps = {
  canvasRef: React.RefObject<ReactSketchCanvasRef | null>
}

function DrawingCanvas({ canvasRef }: DrawingCanvasProps) {
  return (
    <>
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
    </>
  )
}

type UploadPanelProps = {
  uploadedImage: string | null
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  triggerFileInput: () => void
  clearUploadedImage: () => void
}

function UploadPanel({
  uploadedImage,
  fileInputRef,
  handleFileChange,
  triggerFileInput,
  clearUploadedImage,
}: UploadPanelProps) {
  return (
    <>
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

      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />

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
    </>
  )
}
