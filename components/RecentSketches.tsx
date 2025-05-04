import React from "react"
import { Sparkles, Download, Trash2 } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

interface RecentSketchesProps {
  sketches: any[]
}

export const RecentSketches: React.FC<RecentSketchesProps> = ({ sketches }) => {
  const deleteSketch = useMutation(api.sketches.deleteSketch)


  const handleImageError = async (sketchId: string) => {
    console.log(`Image failed to load for sketch: ${sketchId}, deleting...`)
    await deleteSketch({ id: sketchId })
  }

 
  const handleRemoveClick = async (sketchId: string) => {
    if (window.confirm("Are you sure you want to remove this sketch?")) {
      await deleteSketch({ id: sketchId })
    }
  }

  // Handle the download button click
  const handleDownloadClick = (imageUrl: string) => {
    const a = document.createElement("a")
    a.href = imageUrl
    a.download = "sketch.jpg" // You can change this to the appropriate filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (sketches.length === 0) {
    return (
      <div className="text-center py-12 border border-input rounded-lg bg-muted/50">
        <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground">No sketches yet. Create your first one!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {sketches.map((sketch) => (
        <div key={sketch._id} className="border border-input rounded-lg overflow-hidden bg-card p-2">
          <img
            src={sketch.result || "/placeholder.svg"}
            alt="Generated sketch"
            className="w-full aspect-square object-cover rounded"
            onError={() => handleImageError(sketch._id)}  
          />
          <p className="text-sm text-muted-foreground mt-2 truncate">{sketch.prompt}</p>

          <div className="flex justify-between mt-2">
            {/* Download Button */}
            <button 
              onClick={() => handleDownloadClick(sketch.result || "/placeholder.svg")} 
              className="text-blue-500 hover:text-blue-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Download
            </button>

            {/* Remove Button */}
            <button 
              onClick={() => handleRemoveClick(sketch._id)} 
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
