import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import generateEmbedding from "./embedding.service.js";
import { saveDocument } from "../repositories/document.repository.js";
import createDocumentChunks from './chunk.service.js'

export async function createDocument({ content, metadata = {} }) {
    if (!content?.trim()) {
        throw new Error("Document content is required");
    }

    // Split document into smaller chunks
    const documents = await createDocumentChunks(content, metadata);

    const savedDocuments = [];

    // Generate embeddings for each chunk and store them in the vector database
    for (let i = 0; i < documents.length; i++) {
        const document = documents[i];

        const embedding = await generateEmbedding(document.pageContent);

        const savedDocument = await saveDocument(
            document.pageContent,
            embedding,
            {
                ...document.metadata,
                chunkIndex: i,
                totalChunks: documents.length
            }
        );

        savedDocuments.push(savedDocument);
    }

    return savedDocuments;
}