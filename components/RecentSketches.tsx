import React from "react"
import { Sparkles } from "lucide-react"

interface RecentSketchesProps {
  sketches: any[];
}

export const RecentSketches: React.FC<RecentSketchesProps> = ({ sketches }) => {
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
          />
          <p className="text-sm text-muted-foreground mt-2 truncate">{sketch.prompt}</p>
        </div>
      ))}
    </div>
  )
}