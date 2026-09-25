import generateEmbedding from "./embedding.service.js";
import { searchSimilarDocuments } from "../repositories/search.repository.js";
import { rerankDocuments } from "./rerank.service.js";
import { generateResumeAnswer } from "./llm.service.js"
import { createTimer } from "../utils/performance-timer.util.js";

export default async function retrieveDocuments(question) {
    const timer = createTimer("retrieveDocuments");

    try {
        // Generate query embedding
        const queryEmbedding = await timer.measure("embedding", () =>
            generateEmbedding(question, "query")
        );

        // Vector search
        const documents = await timer.measure("vector_search", () =>
            searchSimilarDocuments(queryEmbedding, 10)
        );

        // Rerank retrieved documents
        const rerankedDocuments = await timer.measure("rerank", () =>
            rerankDocuments(question, documents, 5)
        );

        // Generate final answer using top 5 chunks
        const answer = await timer.measure("llm_answer", () =>
            generateResumeAnswer(question, rerankedDocuments)
        );

        return {
            question,
            answer,
            sources: rerankedDocuments
        };
    } finally {
        timer.end();
    }
}
