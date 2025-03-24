import { Sparkles } from "lucide-react"

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
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Sketches</h2>
      </div>

      {sketches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sketches.map((sketch) => (
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
  return (
    <div className="border border-input rounded-lg overflow-hidden bg-card p-2">
      <img
        src={sketch.result || "/placeholder.svg"}
        alt="Generated sketch"
        className="w-full aspect-square object-cover rounded"
      />
      <p className="text-sm text-muted-foreground mt-2 truncate">{sketch.prompt}</p>
    </div>
  )
}

