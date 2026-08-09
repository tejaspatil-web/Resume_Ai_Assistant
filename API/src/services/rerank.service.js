import cohere from "../config/cohere.js";

export async function rerankDocuments(question, documents, topN = 5) {
    if (!question?.trim()) {
        throw new Error("Question is required");
    }

    if (!documents?.length) {
        return [];
    }

    const response = await cohere.rerank({
        model: "rerank-v3.5",
        query: question,
        documents: documents.map(document => document.content),
        topN
    });

    return response.results.map(result => ({
        ...documents[result.index],
        rerankScore: result.relevanceScore
    }));
}