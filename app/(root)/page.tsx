'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function SketchToImage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const saveSketch = useMutation(api.sketches.save);
  const generateImage = useMutation(api.generate.image);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  const handleClearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSubmit = async () => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL('image/png');
    setLoading(true);

    try {
      // Save the sketch to Convex DB
      const sketchId = await saveSketch({ sketch: imageData, prompt });
      
      // Generate image from Replicate API
      const result = await generateImage({ sketchId });
      setGeneratedImage(result.url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas ref={canvasRef} width={400} height={400} className="border border-gray-500" />
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="border p-2 w-full"
      />
      <div className="flex space-x-2">
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Generate</button>
        <button onClick={handleClearCanvas} className="bg-gray-500 text-white p-2 rounded">Clear</button>
      </div>
      {loading && <p>Generating image...</p>}
      {generatedImage && <Image src={generatedImage} alt="Generated Image" width={400} height={400} />}
    </div>
  );
}