import openai from "../config/nvidia.js";

export async function generateResumeAnswer(question, documents) {
    if (!question?.trim()) {
        throw new Error("Question is required");
    }

    if (!documents?.length) {
        return "I could not find relevant information in the resume.";
    }

    const context = documents.map((document, index) => {
            return `### Resume Context ${index + 1} ${document.content}`;
        }).join("\n\n");

     const prompt = `
       You are a Resume AI Assistant.

        Answer the user's question using ONLY the resume context provided below.

        Rules:
        - Do not invent or assume information.
        - If the answer is not available in the context, say:
            "This information is not available in the resume."
        - Keep the answer professional and concise.
        - Use Markdown when it improves readability.
        - Do not mention the retrieval process, embeddings, vector database, or reranking.

        Project-specific rules:
        - If the user asks about a project, provide the relevant project details from the resume.
        - If a GitHub repository link for that project is available in the resume context, add it at the end of the project description.
        - Format the GitHub repository as a clickable Markdown link:
            [View Project on GitHub](https://github.com/tejaspatil-web?tab=repositories)
        - Do not add a GitHub link if the project does not have a GitHub link in the resume context.
        - Never invent or guess a GitHub repository URL.
        - If multiple projects are requested, include the GitHub link for each project only when it is available.

        RESUME CONTEXT:
        ${context}

        USER QUESTION:
        ${question}`;

    const response = await openai.chat.completions.create({
        model: "nvidia/nemotron-3-ultra-550b-a55b",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.2,
        top_p: 0.95,
        max_tokens: 2048,
        stream: false
    });

    return response.choices[0].message.content;
}