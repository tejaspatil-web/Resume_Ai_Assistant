import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50
});

export default async function createDocumentChunks(content, metadata = {}) {
    if (!content?.trim()) {
        throw new Error("Document content is required");
    }

    return splitter.createDocuments(
        [content],
        [metadata]
    );
}