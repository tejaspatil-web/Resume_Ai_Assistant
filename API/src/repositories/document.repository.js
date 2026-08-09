import db from "../config/db.js";

export async function saveDocument(content, embedding, metadata = {}) {
    const query = `
        INSERT INTO documents (
            content,
            metadata,
            embedding
        )
        VALUES (
            $1,
            $2::jsonb,
            $3::vector
        )
        RETURNING id;
    `;

    const params = [
        content,
        JSON.stringify(metadata),
        toPgVector(embedding)
    ];

    return db.query(query, params);
}

function toPgVector(embedding) {
    if (!Array.isArray(embedding) || embedding.length === 0) {
        throw new Error("Invalid embedding");
    }

    return `[${embedding.join(",")}]`;
}