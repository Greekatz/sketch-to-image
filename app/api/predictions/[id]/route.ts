import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function GET(
  request: Request,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = context.params;
    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}