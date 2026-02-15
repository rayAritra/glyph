import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyChOxcM089yt-9I72LukzIARhk0O2uxgvA"
})

export async function POST() {
    try {
        const { text } = await generateText({
            model: google('gemini-flash-latest'),
            prompt: 'Write a vegetarian lasagna recipe for 4 people.',
        });
        return Response.json({ text });
    } catch (error: any) {
        console.error('AI SDK Error:', error);
        return Response.json({
            error: error.message,
            details: error.data || null
        }, { status: 500 });
    }
}