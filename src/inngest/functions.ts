import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyChOxcM089yt-9I72LukzIARhk0O2uxgvA"
})
export const demoGenerate = inngest.createFunction(
    { id: "demo-generate" },
    { event: "demo/generate" },
    async ({ step }) => {
        await step.run("generate-text", async () => {
            return await generateText({
                model: google("gemini-flash-latest"),
                prompt: "Write a vegetarian lasagna recipe for 4 people.",
            })
        })

    },
);   