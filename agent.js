import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(prompt = "Explain the importance of fast language models") {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}

// Execute and log result when run directly
const chatCompletion = await getGroqChatCompletion();
console.log(chatCompletion.choices[0]?.message?.content);