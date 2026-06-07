"use server";

import content from "*.avif";
import { chunkContent } from "@/lib/chunking";
import { documents } from "@/lib/db-schema";
import { db } from "@/lib/DBConnect";
import { generateEmbeddings } from "@/lib/embedding";
import { PDFParse } from "pdf-parse";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    if (!data.text || data.text.trim().length === 0) {
      return {
        sucess: false,
        error: "No Text found in pdf",
      };
    }

    const chunks = await chunkContent(data.text);
    const embeddings = await generateEmbeddings(chunks);
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));
    await db.insert(documents).values(records);
    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (e) {
    console.log("PDF Processing Error", e);
    return {
      success: false,
      error: "failed to process pdf",
    };
  }
}
