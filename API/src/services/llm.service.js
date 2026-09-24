import openai from "../config/nvidia.js";

export async function generateResumeAnswer(question, documents) {
    if (!question?.trim()) {
        throw new Error("Question is required");
    }

    if (!documents?.length) {
        return "I could not find relevant information in the resume.";
    }

    const context = documents
        .map((document, index) => {
            return `### Resume Context ${index + 1}\n${document.content}`;
        })
        .join("\n\n");

    const systemPrompt = `
You are a Resume AI Assistant.

Rules:
1. Answer using ONLY the provided resume context.
2. Never invent skills, experience, projects, achievements, or URLs.
3. If the answer is not available in the context, respond:
   "This information is not available in the resume."
4. Keep answers professional, clear, and concise.
5. Use Markdown formatting when useful.
6. Do not mention embeddings, vector databases, retrieval, or reranking.
7. Include a GitHub project link only if the exact URL is present in the resume context.
8. Do not generate or assume GitHub URLs.
9. Answer only what the user asked.
`;

    const userPrompt = `
Resume Context:
${context}

User Question:
${question}
`;

    const startTime = Date.now();

    try {
        const response = await openai.chat.completions.create({
            model: "nvidia/nemotron-3-ultra-550b-a55b",

            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],

            temperature: 0.2,
            max_tokens: 512,
            stream: false
        });

        const endTime = Date.now();

        console.log(`[PERF] Nemotron API: ${endTime - startTime} ms`);

        console.log(
            `[PERF] Completion tokens: ${
                response.usage?.completion_tokens ?? "N/A"
            }`
        );

        return (
            response.choices?.[0]?.message?.content?.trim() ||
            "I could not generate an answer."
        );

    } catch (error) {
        console.error(
            `[ERROR] Nemotron API failed after ${Date.now() - startTime} ms:`,
            error.message
        );

        throw error;
    }
}
