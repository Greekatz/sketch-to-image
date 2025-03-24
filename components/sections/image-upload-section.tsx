import React from "react"
import { Upload, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ImageUploadSectionProps {
  uploadedImage: string | null;
  triggerFileInput: () => void;
  clearUploadedImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ 
  uploadedImage, 
  triggerFileInput, 
  clearUploadedImage, 
  fileInputRef, 
  handleFileChange 
}) => (
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
          src={uploadedImage}
          alt="Uploaded"
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