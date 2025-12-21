import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@/lib/supabase/server"
import { getUserSubscription, incrementUsage } from "@/lib/polar/subscription"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    // Authenticate user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check subscription and usage limits
    const subscription = await getUserSubscription(user.id)
    
    if (!subscription) {
      return Response.json(
        { error: "No active subscription found. Please subscribe to a plan." },
        { status: 403 }
      )
    }

    // Check usage limit (skip for unlimited Lifetime plan)
    if (subscription.usage_limit !== -1 && subscription.usage_count >= subscription.usage_limit) {
      return Response.json(
        { 
          error: `Monthly limit of ${subscription.usage_limit} transformations reached. Upgrade your plan for more.`,
          limitReached: true,
          currentPlan: subscription.plan_name
        },
        { status: 429 }
      )
    }

    const body = await request.json() as {
      text?: string
      tone?: "professional" | "casual" | "technical"
      length?: "under-50" | "100" | "200" | "500"
    }
    const { text, tone, length } = body

    if (!text) {
      return Response.json({ error: "No text provided" }, { status: 400 })
    }

    if (!process.env.GOOGLE_API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const toneDescription = {
      professional: "professional, formal, and business-appropriate",
      casual: "casual, friendly, and conversational",
      technical: "technical, precise, and using industry terminology",
    }[tone ?? "professional"]

    const lengthDescription = {
      "under-50": "under 50 words, keeping it very concise and to the point",
      "100": "approximately 100 words, providing a balanced level of detail",
      "200": "approximately 200 words, with moderate detail and context",
      "500": "approximately 500 words, with comprehensive detail and explanation",
    }[length ?? "100"]

    const prompt = `You are an expert communication specialist and text transformation assistant. Your task is to transform the provided text while maintaining its core message and intent.

TRANSFORMATION REQUIREMENTS:
1. Tone: Make the text ${toneDescription}
2. Length: Keep it ${lengthDescription}
3. Preserve all key information and main points from the original text
4. Ensure grammatical correctness and natural flow
5. Maintain appropriate context and clarity

IMPORTANT INSTRUCTIONS:
- Return ONLY the transformed text
- Do NOT include any explanations, preambles, or meta-commentary
- Do NOT add phrases like "Here's the transformed text:" or similar
- Ensure the output is ready to use directly

Original text to transform:
${text}

Transformed text:`

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt)
    const transformed = result.response.text().trim()

    // Increment usage count after successful transformation
    await incrementUsage(user.id)

    return Response.json({ 
      transformed,
      usage: {
        count: subscription.usage_count + 1,
        limit: subscription.usage_limit,
        remaining: subscription.usage_limit === -1 ? -1 : subscription.usage_limit - subscription.usage_count - 1
      }
    })
  } catch (error: any) {
    console.error("Transform error:", error)
    console.error("Error details:", JSON.stringify(error, null, 2))
    
    // Check if it's a Rate Limit error (429) - including free tier exhaustion
    if (error.message?.includes("429") || 
        error.status === 429 || 
        error.message?.includes("quota") ||
        error.message?.includes("rate limit") ||
        error.message?.includes("Too Many Requests")) {
      return Response.json(
        { 
          error: "⚠️ Rate limit exceeded. Your Gemini API free tier quota has been exhausted. Please wait 1-2 minutes or upgrade your API plan.",
          retryAfter: 120
        },
        { status: 429 }
      )
    }

    // Check for API key errors
    if (error.message?.includes("API key") || error.message?.includes("API_KEY")) {
      return Response.json(
        { error: "API key is invalid or not configured properly" },
        { status: 401 }
      )
    }

    // Check for blocked content
    if (error.message?.includes("SAFETY") || error.message?.includes("blocked")) {
      return Response.json(
        { error: "Content was blocked by safety filters. Please try different text." },
        { status: 400 }
      )
    }
    
    return Response.json({ 
      error: "Failed to transform text", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
