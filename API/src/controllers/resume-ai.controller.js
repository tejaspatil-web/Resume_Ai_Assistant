import retrieveDocuments from "../services/retrieval.service.js";

export async function askResumeQuestionController(req, res) {
    try {
        const { question } = req.body;

        if (!question?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const result = await retrieveDocuments(question);

        return res.status(200).json({
            success: true,
            message: "Resume question processed successfully",
            answer: result.answer
        });

    } catch (error) {
        console.error("Resume AI error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to process resume question",
            error: error.message
        });
    }
}