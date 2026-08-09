import nvidia from "../config/nvidia.js";

export default async function generateEmbedding(text, inputType = "passage") {
    if (!text?.trim()) {
        throw new Error("Text is required for embedding");
    }

    const response = await nvidia.embeddings.create({
        model: "nvidia/nemotron-3-embed-1b",
        input: text,
        input_type: inputType,
        encoding_format: "float"
    });

    return response.data[0].embedding;
}