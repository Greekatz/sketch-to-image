"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Sparkles, Trash2, Download } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"

type Sketch = {
  _id: string
  _creationTime: number
  result: string
  prompt: string
}

type SketchGalleryProps = {
  sketches: Sketch[]
}

export function SketchGallery({ sketches }: SketchGalleryProps) {
  const [validSketches, setValidSketches] = useState<Sketch[]>([])

  useEffect(() => {
    const now = Date.now()
    const filtered = sketches.filter(
      (sketch) => now - sketch._creationTime < 30 * 60 * 1000, // 30 minutes in ms
    )
    setValidSketches(filtered)

    const interval = setInterval(() => {
      const updated = filtered.filter((sketch) => Date.now() - sketch._creationTime < 30 * 60 * 1000)
      setValidSketches(updated)
    }, 60 * 1000) // refresh every 1 min

    return () => clearInterval(interval)
  }, [sketches])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Sketches</h2>
      </div>

      {validSketches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {validSketches.map((sketch) => (
            <SketchCard key={sketch._id} sketch={sketch} />
          ))}
        </div>
      )}
    </>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12 border border-input rounded-lg bg-muted/50">
      <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
      <p className="text-muted-foreground">No sketches yet. Create your first one!</p>
    </div>
  )
}

type SketchCardProps = {
  sketch: Sketch
}

function SketchCard({ sketch }: SketchCardProps) {
  const deleteSketchMutation = useMutation(api.sketches.deleteSketch)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await deleteSketchMutation({ id: sketch._id })
    } catch (error) {
      console.error("Failed to delete sketch:", error)
    }
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      // Create a safe filename from the prompt
      const safePrompt = sketch.prompt
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()
        .substring(0, 30)

      const filename = `sketch_${safePrompt}_${Date.now()}.jpg`

      // If it's a data URL, download directly
      if (sketch.result.startsWith("data:")) {
        const link = document.createElement("a")
        link.href = sketch.result
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // If it's a regular URL, fetch and download
        const response = await fetch(sketch.result)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up the object URL
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Failed to download sketch:", error)
    }
  }

  return (
    <div className="group relative border border-input rounded-lg overflow-hidden bg-card p-2 hover:bg-card/80 transition-colors">
      <img
        src={sketch.result || "/placeholder.svg"}
        alt="Generated sketch"
        className="w-full aspect-square object-cover rounded"
      />
      <p className="text-sm text-muted-foreground mt-2 truncate">{sketch.prompt}</p>

      {/* Action buttons - appear on hover */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
