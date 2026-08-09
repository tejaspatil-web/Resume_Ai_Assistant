import { createDocument } from "../services/document.service.js";

export async function createDocumentController(req, res) {
    try {
        const { content, metadata } = req.body;

        if (!content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Document content is required"
            });
        }

        const document = await createDocument({
            content,
            metadata
        });

        return res.status(201).json({
            success: true,
            message: "Document created successfully",
            data: document
        });
    } catch (error) {
        console.error("Create document error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create document",
            error: error.message
        });
    }
}