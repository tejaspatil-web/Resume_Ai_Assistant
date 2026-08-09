import generateEmbedding from "./embedding.service.js";
import { searchSimilarDocuments } from "../repositories/search.repository.js";
import { rerankDocuments } from "./rerank.service.js";
import { generateResumeAnswer } from "./llm.service.js"

export default async function retrieveDocuments(question) {
    // Generate query embedding
    const queryEmbedding = await generateEmbedding(question, "query");

    // Vector search
    const documents = await searchSimilarDocuments(queryEmbedding, 10);

    // Rerank retrieved documents
    const rerankedDocuments = await rerankDocuments(question, documents, 5);

    // Generate final answer using top 5 chunks
    const answer = await generateResumeAnswer(question, rerankedDocuments)

    return {
        question,
        answer,
        sources: rerankedDocuments
    };
}