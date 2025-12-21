const pdfParse = require("pdf-parse")
import mammoth from "mammoth"

// Handle file uploads
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    const allowedMimes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ]
    if (!allowedMimes.includes(file.type)) {
      return Response.json({ error: "Invalid file type. Please upload PDF, DOCX, or TXT." }, { status: 400 })
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Parse files based on type
    const buffer = await file.arrayBuffer()
    let extractedText = ""

    try {
      if (file.type === "text/plain") {
        // Handle .txt files
        const decoder = new TextDecoder("utf-8")
        extractedText = decoder.decode(buffer)
      } else if (file.type === "application/pdf") {
        // Handle PDF files
        const pdfData = await pdfParse(Buffer.from(buffer))
        extractedText = pdfData.text
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        // Handle DOCX files
        const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) })
        extractedText = result.value
      }

      if (!extractedText || extractedText.trim().length === 0) {
        return Response.json({ error: "No text content found in the file" }, { status: 400 })
      }
    } catch (parseError) {
      console.error("Parse error:", parseError)
      return Response.json({ error: "Failed to parse file content" }, { status: 500 })
    }

    return Response.json({
      success: true,
      filename: file.name,
      extractedText,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return Response.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
