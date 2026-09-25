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
5. Do not mention embeddings, vector databases, retrieval, or reranking.
6. Include a GitHub project link only if the exact URL is present in the resume context.
7. Do not generate or assume GitHub URLs.
8. Answer only what the user asked.

Formatting (always respond in Markdown):
- Start with a one-line summary sentence.
- Use bullet points for lists (skills, responsibilities, projects, achievements).
- Group related items under short bold labels (e.g. **Frontend:**, **Backend:**) when there are several categories.
- Use ### headings only when the answer covers multiple sections (e.g. several projects or jobs).
- Bold key names such as companies, job titles, project names and technologies.
- Show links as Markdown links: [Project Name](url).
- Do not wrap the answer in a code block.
- Never answer with a single plain paragraph or a comma-separated list.
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
            model: "nvidia/nemotron-3-super-120b-a12b",

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
            stream: false,
            chat_template_kwargs: {
                enable_thinking: false
            }
        });

        const endTime = Date.now();

        console.log(`[PERF] Nemotron API: ${endTime - startTime} ms`);

        console.log(
            `[PERF] Completion tokens: ${
                response.usage?.completion_tokens ?? "N/A"
            } | finish_reason: ${response.choices?.[0]?.finish_reason ?? "N/A"}`
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
