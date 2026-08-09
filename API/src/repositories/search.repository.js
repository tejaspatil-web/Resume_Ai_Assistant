import db from "../config/db.js";

export async function searchSimilarDocuments(queryEmbedding, limit = 10) {
    const query = `
        SELECT
            id,
            content,
            metadata,
            1 - (embedding <=> $1::vector) AS similarity
        FROM documents
        ORDER BY embedding <=> $1::vector
        LIMIT $2;
    `;

    const vector = `[${queryEmbedding.join(",")}]`;

    return db.query(query, [
        vector,
        limit
    ]);
}